"use client";

import { useState } from "react";

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "requests">("browse");
  const [requestTopic, setRequestTopic] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const materials = [
    { id: 1, subject: "Intro to Computer Science", topic: "Module 3: Binary Trees", date: "Oct 12, 2026", type: "PDF Notes" },
    { id: 2, subject: "Advanced Calculus", topic: "Session 4: Integrals", date: "Oct 14, 2026", type: "Video Lecture" },
    { id: 3, subject: "Physics I", topic: "Kinematics Summary", date: "Oct 15, 2026", type: "PDF Notes" },
  ];

  const [requests, setRequests] = useState([
    { id: 101, subject: "Data Structures", topic: "Graph Algorithms Example", status: "Pending", date: "Oct 20, 2026" },
    { id: 102, subject: "Linear Algebra", topic: "Eigenvectors detailed notes", status: "Fulfilled", date: "Oct 18, 2026" },
  ]);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTopic.trim()) return;
    setRequests([{ id: Date.now(), subject: "General Request", topic: requestTopic, status: "Pending", date: "Oct 22, 2026" }, ...requests]);
    setRequestTopic("");
    setShowRequestForm(false);
    setActiveTab("requests");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Study Materials</h1>
          <p className="text-slate-600 mt-0.5">
            Browse uploaded session notes or request specific topics.
          </p>
        </div>
        <button 
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"
        >
          <span className="text-xl">+</span> Request Material
        </button>
      </div>

      {showRequestForm && (
        <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm relative">
          <button 
            onClick={() => setShowRequestForm(false)} 
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold text-indigo-900 mb-2">Submit a Request</h2>
          <p className="text-sm text-slate-600 mb-4">Can&apos;t find what you&apos;re looking for? Ask your faculty for specific notes.</p>
          <form onSubmit={handleRequest} className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. Needs more examples on Binary Trees for CS101..." 
              value={requestTopic}
              onChange={(e) => setRequestTopic(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button 
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'browse' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Available Materials
          </button>
          <button 
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'requests' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            My Requests
          </button>
        </div>

        <div className="p-0">
          {activeTab === "browse" ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Subject</th>
                  <th className="px-6 py-3 font-medium">Topic / File</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(m => (
                  <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-800">{m.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-600">📄</span>
                        {m.topic}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{m.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 font-medium hover:text-indigo-800">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Subject</th>
                  <th className="px-6 py-3 font-medium">Requested Topic</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(r => (
                  <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-slate-500">{r.date}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{r.subject}</td>
                    <td className="px-6 py-4 text-slate-600">{r.topic}</td>
                    <td className="px-6 py-4">
                      {r.status === 'Pending' ? (
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Pending</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Fulfilled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
