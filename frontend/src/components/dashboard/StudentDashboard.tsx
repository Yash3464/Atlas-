"use client";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/academic/student-dashboard");
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

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading AI Analysis...</div>;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Overall Academic Status</h3>
          <div className="text-3xl font-bold text-slate-800">At Risk</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Average Attendance</h3>
          <div className="text-3xl font-bold text-slate-800">
            {(data.performance.reduce((acc: number, curr: any) => acc + curr.attendance, 0) / data.performance.length).toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-1">Active Alerts</h3>
          <div className="text-3xl font-bold text-red-600">{data.alerts.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Subject Performance</h2>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Subject</th>
                  <th className="px-6 py-3 font-medium">Marks</th>
                  <th className="px-6 py-3 font-medium">Attendance</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.performance.map((p: any) => (
                  <tr key={p.subject_id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{p.subject_id}</td>
                    <td className="px-6 py-4">
                      <span className={p.marks < 40 ? "text-red-600 font-semibold" : "text-slate-600"}>{p.marks}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={p.attendance < 75 ? "text-amber-600 font-semibold" : "text-slate-600"}>{p.attendance}%</span>
                    </td>
                    <td className="px-6 py-4">
                      {p.marks < 40 || p.attendance < 75 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Weak Area
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          On Track
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-indigo-50/50 flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h2 className="text-lg font-semibold text-indigo-900">AI Adaptive Plan</h2>
          </div>
          <div className="p-6 flex-1 bg-slate-50/30">
            <div className="space-y-4">
              {data.recommendations.map((rec: any) => (
                <div key={rec.id} className="flex gap-3 items-start bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {rec.type === 'STUDY_MATERIAL' ? '📚' : '🎯'}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 mb-1">{rec.type.replace('_', ' ')}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{rec.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts Panel */}
      {data.alerts.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-lg font-semibold text-red-900">Active Academic Alerts</h2>
          </div>
          <div className="space-y-3">
            {data.alerts.map((alert: any) => (
              <div key={alert.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-red-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${alert.type === 'LOW_MARKS' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                </div>
                <button className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors">
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
