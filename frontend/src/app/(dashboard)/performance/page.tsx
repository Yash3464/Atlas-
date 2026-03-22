"use client";

import { useState } from "react";

export default function PerformancePage() {
  const [data] = useState([
    { subject: "Intro to Computer Science", marks: 38.5, attendance: 72.0, examId: "MIDTERM_1" },
    { subject: "Advanced Calculus", marks: 85.0, attendance: 90.0, examId: "MIDTERM_1" },
    { subject: "Physics I", marks: 65.0, attendance: 80.0, examId: "MIDTERM_1" },
    { subject: "Data Structures", marks: 45.0, attendance: 78.0, examId: "MIDTERM_1" },
    { subject: "Linear Algebra", marks: 92.0, attendance: 95.0, examId: "MIDTERM_1" },
  ]);

  const weakSubjects = data.filter(d => d.marks < 50);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Performance</h1>
        <p className="text-slate-600 mt-0.5">
          Detailed breakdown of your exams and scores.
        </p>
      </div>

      {weakSubjects.length > 0 && (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm">
          <h2 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Exams Requiring Immediate Attention
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weakSubjects.map((sub, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                <div className="text-sm font-medium text-slate-500">{sub.examId}</div>
                <div className="text-lg font-bold text-slate-800">{sub.subject}</div>
                <div className="mt-2 text-red-600 font-semibold">{sub.marks}% Score</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800">All Exam Scores</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Exam ID</th>
                <th className="px-6 py-3 font-medium">Subject</th>
                <th className="px-6 py-3 font-medium">Marks</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">{p.examId}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{p.subject}</td>
                  <td className="px-6 py-4">
                    <span className={p.marks < 50 ? "text-red-600 font-semibold" : "text-slate-600"}>{p.marks}%</span>
                  </td>
                  <td className="px-6 py-4">
                    {p.marks < 50 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Needs Improvement
                      </span>
                    ) : p.marks >= 85 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Excellent
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Satisfactory
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
