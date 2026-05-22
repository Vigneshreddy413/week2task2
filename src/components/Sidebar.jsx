import { BarChart3, BriefcaseBusiness, Gauge, Settings, UserRoundCheck, UsersRound, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Dashboard', icon: Gauge },
  { to: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { to: '/applicants', label: 'Applicants', icon: UserRoundCheck },
  { to: '/users', label: 'Users', icon: UsersRound },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`fixed inset-0 z-20 bg-slate-950/40 lg:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-white/70 bg-white/88 p-5 backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-950/88 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/25">H</div>
            <h1 className="mt-4 text-xl font-extrabold text-slate-950 dark:text-white">HireHub Admin</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Job portal command center</p>
          </div>
          <button className="icon-button lg:hidden" onClick={onClose} type="button" title="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="mt-8 grid gap-2">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-900'}`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950 p-4 text-white dark:bg-blue-600">
          <p className="text-sm font-bold">Premium analytics</p>
          <p className="mt-1 text-xs text-white/70">Live admin metrics powered by local workspace data.</p>
        </div>
      </aside>
    </>
  );
}
