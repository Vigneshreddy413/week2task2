import { Bell, Download, LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { exportJson } from '../utils/seedData.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Topbar({ onMenu }) {
  const { logout, jobs, applicants, users, analytics, notify } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  function handleGlobalSearch(event) {
    event.preventDefault();
    const lower = query.trim().toLowerCase();
    if (!lower) return;
    const hit = jobs.find((job) => job.title.toLowerCase().includes(lower)) || applicants.find((applicant) => applicant.name.toLowerCase().includes(lower)) || users.find((user) => user.name.toLowerCase().includes(lower));
    if (hit?.title) navigate('/jobs');
    else if (hit?.role && hit?.experience) navigate('/applicants');
    else if (hit?.role) navigate('/users');
    notify(hit ? `Found ${hit.title || hit.name}` : 'No matching record found', hit ? 'success' : 'error');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-10 border-b border-white/70 bg-[#eef4ff]/80 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78 lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button className="icon-button lg:hidden" onClick={onMenu} type="button" title="Open menu">
          <Menu size={18} />
        </button>
        <form onSubmit={handleGlobalSearch} className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="input-shell w-full pl-10"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs, applicants, users..."
          />
        </form>
        <button
          className="ghost-button"
          type="button"
          onClick={() => {
            exportJson('hirehub-admin-export.json', { jobs, applicants, users, analytics });
            notify('Dashboard data exported');
          }}
        >
          <Download size={17} />
          <span className="hidden sm:inline">Export</span>
        </button>
        <div className="relative">
          <button className="icon-button" type="button" title="Notifications" onClick={() => setShowNotifications((value) => !value)}>
            <Bell size={18} />
          </button>
          {showNotifications && (
            <div className="glass-panel absolute right-0 mt-3 w-72 rounded-2xl p-3">
              {analytics.notifications.map((item) => (
                <div key={item} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-900">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <ThemeToggle />
        <button className="icon-button" onClick={handleLogout} type="button" title="Logout">
          <LogOut size={18} />
        </button>
        <div className="hidden items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm dark:bg-slate-950 md:flex">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-violet-600" />
          <div>
            <p className="text-sm font-bold text-slate-950 dark:text-white">Admin</p>
            <p className="text-xs text-slate-500">admin@hirehub.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
