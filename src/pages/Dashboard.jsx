import { motion } from 'framer-motion';
import { Building2, Clock3, FileCheck2, UserRoundCheck, UsersRound, BriefcaseBusiness } from 'lucide-react';
import AnalyticsCharts from '../charts/AnalyticsCharts.jsx';
import StatCard from '../components/StatCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Dashboard() {
  const { jobs, applicants, users, analytics } = useApp();
  const stats = [
    { label: 'Total Jobs Posted', value: jobs.length, trend: '+14%', icon: BriefcaseBusiness, gradient: 'bg-gradient-to-br from-blue-600 to-cyan-500' },
    { label: 'Total Applications', value: jobs.reduce((sum, job) => sum + job.applicants, 0), trend: '+24%', icon: FileCheck2, gradient: 'bg-gradient-to-br from-violet-600 to-fuchsia-500' },
    { label: 'Total Users', value: users.length + 1284, trend: '+18%', icon: UsersRound, gradient: 'bg-gradient-to-br from-sky-600 to-blue-700' },
    { label: 'Active Jobs', value: jobs.filter((job) => job.status === 'Active').length, trend: '+9%', icon: Clock3, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { label: 'Pending Applications', value: applicants.filter((item) => item.status === 'Pending').length, trend: '+6%', icon: UserRoundCheck, gradient: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { label: 'Companies Registered', value: new Set(jobs.map((job) => job.company)).size + 216, trend: '+11%', icon: Building2, gradient: 'bg-gradient-to-br from-indigo-600 to-blue-600' },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Overview</p>
        <h1 className="text-3xl font-black tracking-normal text-slate-950 dark:text-white">Job portal analytics</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
      <AnalyticsCharts compact />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-extrabold">Recent job activity</h2>
          <div className="mt-4 grid gap-3">
            {analytics.activities.map((activity) => (
              <div key={activity} className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {activity}
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">Live</span>
              </div>
            ))}
          </div>
        </section>
        <section className="glass-panel rounded-2xl p-5">
          <h2 className="text-lg font-extrabold">Top roles</h2>
          <div className="mt-4 grid gap-4">
            {jobs.slice(0, 4).map((job) => (
              <div key={job.id}>
                <div className="flex justify-between text-sm font-bold">
                  <span>{job.title}</span>
                  <span>{job.applicants}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${Math.min(job.applicants, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
