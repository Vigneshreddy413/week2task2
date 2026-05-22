import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from 'recharts';
import { useApp } from '../context/AppContext.jsx';

const colors = ['#2563eb', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

function ChartCard({ title, children }) {
  return (
    <section className="glass-panel rounded-2xl p-5">
      <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">{title}</h2>
      <div className="mt-5 h-72">{children}</div>
    </section>
  );
}

export default function AnalyticsCharts({ compact = false }) {
  const { jobs, analytics } = useApp();
  const categoryData = Object.values(jobs.reduce((acc, job) => {
    acc[job.category] = acc[job.category] || { name: job.category, value: 0 };
    acc[job.category].value += 1;
    return acc;
  }, {}));

  const visibleJobs = compact ? jobs.slice(0, 5) : jobs;

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="Applications per Job">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={visibleJobs}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe5f4" />
            <XAxis dataKey="title" tick={{ fontSize: 11 }} interval={0} angle={-12} height={60} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }} />
            <Bar dataKey="applicants" radius={[10, 10, 0, 0]} fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Jobs by Category">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={104} paddingAngle={4}>
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {!compact && (
        <>
          <ChartCard title="Monthly Applications">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe5f4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={4} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="User Growth & Active Jobs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyApplications}>
                <defs>
                  <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe5f4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={3} fill="url(#userGrowth)" />
                <Line type="monotone" dataKey="activeJobs" stroke="#06b6d4" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}
    </div>
  );
}
