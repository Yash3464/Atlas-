"use client";

import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/academic/faculty-dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Faculty Insights...</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Total Students Monitored</h3>
          <div className="text-3xl font-bold text-slate-800">{data.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">At-Risk Students</h3>
          <div className="text-3xl font-bold text-red-600">
            {data.filter(s => s.at_risk).length}
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Student Roster</h2>
          <span className="text-sm text-slate-500">AI Priority Flagging Enabled</span>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">Student Info</th>
                <th className="px-6 py-3 font-medium">Flag Status</th>
                <th className="px-6 py-3 font-medium">Action Needed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.student_id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{student.email}</div>
                    <div className="text-xs text-slate-500 mt-0.5">ID: {student.student_id}</div>
                  </td>
                  <td className="px-6 py-4">
                    {student.at_risk ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        AI Flagged (At-Risk)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        On Track
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      student.at_risk 
                        ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}>
                      {student.at_risk ? 'Review Profile' : 'View Profile'}
                    </button>
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
