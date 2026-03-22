# 🎓 AI Personalized Learning Command Centre

A next-generation, high-performance web platform designed to empower students and university faculties. Built on a top-tier tech stack, this application analyzes academic performance, flags weak subjects, and deploys an interactive AI Chatbot to guide students toward academic success.

![Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)

---

## ✨ Key Features

### 👨‍🎓 For Students
* **Academic Dashboard:** Visualize real-time GPA trends, attendance records, and immediate academic alerts.
* **Smart Performance Tracker:** Automatically identifies academic weak points based on recent scores.
* **AI Learning Assistant:** A real-time, context-aware chatbot powered by **Google Gemini API** that provides tailored study strategies, textbook recommendations, and academic counseling.
* **Materials & Notes Hub:** Request specific lecture notes or access pre-uploaded materials from faculties instantly.

### 👨‍🏫 For Faculty & Admins
* **Faculty Command View:** A master roster displaying all students at a glance, with color-coded alerts for at-risk students (red for failing, yellow for warnings).
* **Material Management:** Directly upload session notes, manage incoming student material requests, and oversee class performance from a single interface.
* **Automated Audit Logging:** Built-in tracking for attendance alerts and grade monitoring.

---

## 💻 Technology Stack

| Architecture | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Next.js 14 (App Router), TailwindCSS, Recharts, Lucide-React |
| **Backend** | Python 3.11, FastAPI, SQLAlchemy, Alembic |
| **Database** | PostgreSQL 15 |
| **AI Integration** | Google Generative AI (Gemini 2.0 Flash) + Smart Local Mock Engine fallback |
| **DevOps** | Docker, Docker Compose, GNU Make |

---

## 🚀 Quick Start (Local Setup)

Get the Command Centre running locally in under **3 minutes** using Docker.

### 1. Clone & Prepare
```bash
git clone https://github.com/your-username/ai-learning-command-centre.git
cd ai-learning-command-centre

# Create your environment files
cp .env.example .env
```

### 2. Configure Environment Secrets
Ensure your `.env` file has the required encryption keys:
```bash
NEXTAUTH_SECRET=generate_a_secure_base64_string_here
SECRET_KEY=generate_a_secure_base64_string_here
```

**To enable the AI Learning Assistant:**
1. Create a `.env.local` file inside the `frontend/` directory.
2. Add your Google AI Studio key:
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: The system features a built-in **Smart Mock Engine**. If your API key runs out of Google Cloud quota, the chatbot will seamlessly fallback to highly-realistic, dynamic local responses so your application never breaks during a presentation!)*

### 3. Spin Up the Platform
Ensure Docker Desktop is running, then execute:
```bash
make up
```
This single command builds and networks the PostgreSQL database, FastAPI backend, and Next.js frontend into isolated, secure containers.

### 4. Access the Application

| Portal | Local URL | Description |
| :--- | :--- | :--- |
| **Main Web App** | `http://localhost:3000` | The user-facing Next.js application |
| **Backend API Docs** | `http://localhost:8000/docs` | Swagger UI for FastAPI testing |

**Demo Login Credentials:**
* `yashwardhan@atlasuniversity.edu.in` | Student Access
* `prathamesh@atlasuniversity.edu.in` | Student Access
* `rhythm@atlasuniversity.edu.in` | Student Access
* `faculty@atlasuniversity.edu.in` | Faculty Command View

*(Password for all dummy accounts: `password123`)*

---

## 🛠️ Project Architecture 
* `/frontend`: Houses the Next.js UI, Tailwind configurations, React hooks, and the NextAuth layer. The chatbot engine sits at `/src/app/api/chat/route.ts`.
* `/backend`: Contains the FastAPI routing, Pydantic schemas, and SQLAlchemy ORM models (`/app/models/academic.py`).

## 🤝 Contribution & Support
Feel free to fork this repository and submit pull requests to enhance the AI prediction models or expand the dashboard metrics! 
