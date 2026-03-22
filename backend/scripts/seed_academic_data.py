import asyncio
import random
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import async_session_maker
from app.models.user import User, UserRole, UserStatus
from app.models.academic import Subject, StudentPerformance, Recommendation, RecommendationType, Alert, AlertType

async def seed_data():
    async with async_session_maker() as session:
        # Check if already seeded
        existing = await session.execute(text("SELECT COUNT(*) FROM subjects;"))
        if existing.scalar() > 0:
            print("Already seeded subjects.")
            return

        faculty_pwd = "$2b$12$Ld.hFvJ0S6Z4C.jPZf0QYuE2lqO8PjQvFp8yZkK8PjQvFp8yZkK8P"  # Dummy hash
        faculty_user = User(
            email="faculty@atlasuniversity.edu.in",
            hashed_password=faculty_pwd,
            role=UserRole.FACULTY,
            status=UserStatus.APPROVED,
        )
        session.add(faculty_user)
        
        # Create Subjects
        subjects = [
            Subject(code="CS101", name="Intro to Computer Science"),
            Subject(code="MATH201", name="Advanced Calculus"),
            Subject(code="PHYS101", name="Physics I"),
            Subject(code="ML301", name="Machine Learning"),
        ]
        for sub in subjects:
            session.add(sub)
        
        await session.flush()

        # Create Students
        student_pwd = "$2b$12$Ld.hFvJ0S6Z4C.jPZf0QYuE2lqO8PjQvFp8yZkK8PjQvFp8yZkK8P"  # Dummy hash
        students = []
        for i in range(5):
            student = User(
                email=f"student{i+1}@atlasuniversity.edu.in",
                hashed_password=student_pwd,
                role=UserRole.STUDENT,
                status=UserStatus.APPROVED,
            )
            session.add(student)
            students.append(student)
        
        await session.flush()

        # Generate Performance Data
        for student in students:
            for sub in subjects:
                # Randomize marks to have some < 40 and attendance < 75
                marks = random.uniform(30.0, 95.0)
                attendance = random.uniform(50.0, 100.0)
                perf = StudentPerformance(
                    student_id=student.id,
                    subject_id=sub.id,
                    marks_percentage=marks,
                    attendance_percentage=attendance,
                )
                session.add(perf)

        await session.commit()
        print("Data seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
