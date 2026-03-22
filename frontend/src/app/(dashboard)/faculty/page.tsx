"use client";

import { useState } from "react";

export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState<"roster" | "materials">("roster");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(1);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Mock Data
  const students = [
    {
      id: 1,
      name: "Yashwardhan Singh",
      email: "yashwardhan.s@atlasuniversity.edu.in",
      atRisk: true,
      performance: [
        { subject: "Intro to CS", marks: 38.5 },
        { subject: "Calculus", marks: 85.0 }
      ],
      alerts: ["Critical: Intro to CS (38.5%)"],
      recommendations: ["Assign tutor for Intro to CS module 3."]
    },
    {
      id: 2,
      name: "Prathamesh Bhandare",
      email: "prathamesh.b@atlasuniversity.edu.in",
      atRisk: false,
      performance: [
        { subject: "Physics", marks: 92.0 },
        { subject: "Calculus", marks: 88.0 }
      ],
      alerts: [],
      recommendations: ["On track for Physics distinction."]
    },
  ];

  const studentRequests = [
    { id: 101, student: "Yashwardhan Singh", subject: "Intro to CS", topic: "Pointers and memory allocation examples", status: "Pending", date: "Oct 21, 2026" },
  ];

  const uploadedMaterials = [
    { id: 1, subject: "Intro to CS", topic: "Module 3: Binary Trees", date: "Oct 12, 2026", type: "PDF" },
  ];

  const activeStudent = students.find(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Dashboard</h1>
          <p className="text-slate-600 mt-0.5">
            Manage your student roster and course materials.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("roster")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'roster' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Student Roster
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'materials' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Course Materials
          </button>
        </div>
      </div>

      {activeTab === "roster" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-semibold text-slate-800">Student Roster</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {students.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudent(s.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                    selectedStudent === s.id ? "bg-indigo-50 border border-indigo-200" : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </div>
                  {s.atRisk && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            {activeStudent ? (
              <>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{activeStudent.name}</h2>
                    <p className="text-sm text-slate-500">ID: {activeStudent.id} • {activeStudent.email}</p>
                  </div>
                  {activeStudent.atRisk ? (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">At Risk (AI Flagged)</span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">On Track</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50">
                      <h3 className="font-semibold text-slate-800">Academic Performance</h3>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium">Subject</th>
                          <th className="px-4 py-2 text-left font-medium">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeStudent.performance.map((p, i) => (
                           <tr key={i} className="border-t border-slate-100">
                             <td className="px-4 py-3">{p.subject}</td>
                             <td className={`px-4 py-3 font-semibold ${p.marks < 50 ? 'text-red-600' : 'text-slate-700'}`}>{p.marks}%</td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Alerts */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-red-50/50">
                      <h3 className="font-semibold text-red-900">Active Alerts</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {activeStudent.alerts.length > 0 ? activeStudent.alerts.map((a, i) => (
                        <div key={i} className="p-3 bg-red-50 border border-red-100 text-sm text-red-800 rounded-md">{a}</div>
                      )) : <div className="text-sm text-slate-500">No active alerts.</div>}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {activeTab === "materials" && (
        <div className="space-y-6">
          {/* Upload Note Button */}
          <div className="flex justify-between items-center bg-white p-6 border border-slate-200 shadow-sm rounded-xl">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Upload Session Notes</h2>
              <p className="text-sm text-slate-600">Distribute new class materials directly to students.</p>
            </div>
            <button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              + Upload Notes
            </button>
          </div>

          {showUploadForm && (
            <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm">
              <h3 className="font-semibold mb-4 text-slate-800">New Material Upload</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Subject (e.g., CS101)" className="px-4 py-2 border rounded-md text-sm" />
                <input type="text" placeholder="Topic Title" className="px-4 py-2 border rounded-md text-sm" />
                <div className="col-span-2 flex items-center gap-4">
                  <input type="file" className="text-sm" />
                  <button onClick={() => setShowUploadForm(false)} className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-md text-sm ml-auto">Submit Material</button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Requests */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-amber-50/50">
                <h3 className="font-bold text-amber-900">Pending Student Requests</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium">Student</th>
                      <th className="px-4 py-2 font-medium">Topic Request</th>
                      <th className="px-4 py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentRequests.map(req => (
                      <tr key={req.id} className="border-b border-slate-100">
                        <td className="px-4 py-3 font-medium text-slate-800">{req.student}</td>
                        <td className="px-4 py-3 text-slate-600">{req.topic}</td>
                        <td className="px-4 py-3">
                          <button className="text-indigo-600 font-medium hover:text-indigo-800 px-2 py-1 bg-indigo-50 rounded-md border border-indigo-100">Upload Required Notes</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Uploaded History */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">Recently Uploaded</h3>
              </div>
              <div className="p-4 space-y-3">
                {uploadedMaterials.map(m => (
                  <div key={m.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{m.topic}</div>
                      <div className="text-xs text-slate-500">{m.subject} • {m.date}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded uppercase">{m.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
