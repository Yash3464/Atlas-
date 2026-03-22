"use client";

export default function AlertsPage() {
  const alerts = [
    { subject: "Intro to Computer Science", score: "38.5%", message: "Critical: Score is well below the passing threshold. Immediate action required." },
    { subject: "Data Structures", score: "45.0%", message: "Warning: Score has fallen into the At-Risk boundary. Monitor closely." }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Alerts</h1>
        <p className="text-slate-600 mt-0.5">
          Important academic notifications regarding poor performance.
        </p>
      </div>

      <div className="bg-red-50 rounded-xl border border-red-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-red-200 pb-4">
          <svg className="w-6 h-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-red-900">Subjects Not Performing Well</h2>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-lg border border-red-100 shadow-sm gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-lg font-bold text-slate-800">{alert.subject}</h3>
                </div>
                <p className="text-sm font-medium text-slate-600 pl-5">{alert.message}</p>
              </div>
              <div className="shrink-0 text-left sm:text-right pl-5 sm:pl-0">
                <div className="text-xs text-slate-500 uppercase font-semibold">Current Score</div>
                <div className="text-2xl font-black text-red-600">{alert.score}</div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-emerald-700 font-medium bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              You are performing well across all subjects! No alerts at this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
