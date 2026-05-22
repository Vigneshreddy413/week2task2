import AnalyticsCharts from '../charts/AnalyticsCharts.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Analytics() {
  const { analytics } = useApp();
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Insights</p>
        <h1 className="text-3xl font-black">Analytics</h1>
      </div>
      <AnalyticsCharts />
      <section className="glass-panel rounded-2xl p-5">
        <h2 className="text-lg font-extrabold">Monthly performance</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {analytics.monthlyApplications.map((item) => (
            <div key={item.month} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <p className="text-sm font-bold text-slate-500">{item.month}</p>
              <p className="mt-2 text-2xl font-black">{item.applications} applications</p>
              <p className="text-sm text-slate-500">{item.users} users, {item.activeJobs} active jobs</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
