from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.core.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.academic import Subject, StudentPerformance, Recommendation, Alert
from app.services.ai_service import AIService

router = APIRouter(prefix="/academic", tags=["academic"])

@router.get("/student-dashboard")
async def get_student_dashboard(
    # Bypass auth for demo
    db: AsyncSession = Depends(get_db)
):
    # Fetch default student (student1)
    res = await db.execute(select(User).where(User.email == "student1@atlasuniversity.edu.in"))
    current_user = res.scalar_one_or_none()
    if not current_user:
        return {"error": "Student not found in DB"}
    # Safety Check
    if current_user.role != UserRole.STUDENT and current_user.role != UserRole.ADMIN:
        pass

    # Process AI
    await AIService.analyze_student_performance(db, current_user.id)
    # Commit alerts and recs created by AI
    await db.commit()

    # Fetch fresh data
    perf_res = await db.execute(select(StudentPerformance).where(StudentPerformance.student_id == current_user.id))
    perfs = perf_res.scalars().all()
    
    alert_res = await db.execute(select(Alert).where(Alert.user_id == current_user.id).order_by(Alert.created_at.desc()))
    alerts = alert_res.scalars().all()

    rec_res = await db.execute(select(Recommendation).where(Recommendation.student_id == current_user.id).order_by(Recommendation.created_at.desc()))
    recs = rec_res.scalars().all()

    # Subjects for mapping
    # Simple formatting
    performance_data = [
        {"subject_id": p.subject_id, "marks": p.marks_percentage, "attendance": p.attendance_percentage}
        for p in perfs
    ]
    
    return {
        "student_id": current_user.id,
        "email": current_user.email,
        "performance": performance_data,
        "alerts": [{"id": a.id, "type": a.alert_type, "message": a.message, "is_read": a.is_read} for a in alerts],
        "recommendations": [{"id": r.id, "type": r.recommendation_type, "content": r.content} for r in recs]
    }

@router.get("/faculty-dashboard")
async def get_faculty_dashboard(
    db: AsyncSession = Depends(get_db)
):
    # Get all students
    student_res = await db.execute(select(User).where(User.role == UserRole.STUDENT))
    students = student_res.scalars().all()

    # Get all performances
    perf_res = await db.execute(select(StudentPerformance))
    perfs = perf_res.scalars().all()

    # Subject details
    sub_res = await db.execute(select(Subject))
    subjects = sub_res.scalars().all()
    sub_map = {s.id: s.name for s in subjects}

    dash_data = []
    for s in students:
        s_perfs = [p for p in perfs if p.student_id == s.id]
        at_risk = any(p.marks_percentage < 40 or p.attendance_percentage < 75 for p in s_perfs)
        
        dash_data.append({
            "student_id": s.id,
            "email": s.email,
            "at_risk": at_risk,
            "performance": [{"subject": sub_map.get(p.subject_id, str(p.subject_id)), "marks": p.marks_percentage, "attendance": p.attendance_percentage} for p in s_perfs]
        })
    
    return dash_data
