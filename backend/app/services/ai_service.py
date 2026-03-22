from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.academic import StudentPerformance, Recommendation, RecommendationType, Alert, AlertType

class AIService:
    @staticmethod
    async def analyze_student_performance(session: AsyncSession, student_id: int):
        # Fetch all performance data for this student
        result = await session.execute(
            select(StudentPerformance).where(StudentPerformance.student_id == student_id)
        )
        performances = result.scalars().all()

        recommendations = []
        alerts = []

        # Simple Rule-based AI evaluation
        for perf in performances:
            if perf.marks_percentage < 40.0:
                alerts.append(
                    Alert(
                        user_id=student_id,
                        alert_type=AlertType.LOW_MARKS,
                        message=f"Critical: Marks are below 40% ({perf.marks_percentage:.1f}%) in subject ID {perf.subject_id}."
                    )
                )
                recommendations.append(
                    Recommendation(
                        student_id=student_id,
                        subject_id=perf.subject_id,
                        recommendation_type=RecommendationType.STUDY_MATERIAL,
                        content=f"AI Recommendation: Review basics for subject {perf.subject_id}. Consider booking office hours with faculty."
                    )
                )
            
            if perf.attendance_percentage < 75.0:
                alerts.append(
                    Alert(
                        user_id=student_id,
                        alert_type=AlertType.LOW_ATTENDANCE,
                        message=f"Warning: Attendance is critically low ({perf.attendance_percentage:.1f}%) in subject ID {perf.subject_id}."
                    )
                )
                recommendations.append(
                    Recommendation(
                        student_id=student_id,
                        subject_id=perf.subject_id,
                        recommendation_type=RecommendationType.FOCUS_AREA,
                        content=f"AI Adaptive Path: Please attend consecutive lectures to recover attendance in subject {perf.subject_id}."
                    )
                )

        # In a real app we would check if these already exist or limit spam.
        # For prototype, we just bulk insert. Optionally, we can clear existing alerts before creating new ones.
        return alerts, recommendations
