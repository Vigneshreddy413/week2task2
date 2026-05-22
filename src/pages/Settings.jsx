import { Bell, ShieldCheck, UserRoundCog } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function Settings() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Workspace</p>
        <h1 className="text-3xl font-black">Settings</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="glass-panel rounded-2xl p-5">
          <UserRoundCog className="text-blue-600" />
          <h2 className="mt-4 text-lg font-extrabold">Profile management</h2>
          <div className="mt-4 grid gap-3">
            <input className="input-shell" defaultValue="HireHub Admin" />
            <input className="input-shell" defaultValue="admin@hirehub.com" />
            <button className="primary-button" type="button">Save profile</button>
          </div>
        </section>
        <section className="glass-panel rounded-2xl p-5">
          <Bell className="text-violet-600" />
          <h2 className="mt-4 text-lg font-extrabold">Notifications</h2>
          {['Application alerts', 'Employer approvals', 'Weekly exports'].map((item) => (
            <label key={item} className="mt-4 flex items-center justify-between rounded-2xl bg-white p-3 text-sm font-bold dark:bg-slate-900">
              {item}
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-blue-600" />
            </label>
          ))}
        </section>
        <section className="glass-panel rounded-2xl p-5">
          <ShieldCheck className="text-emerald-600" />
          <h2 className="mt-4 text-lg font-extrabold">Dashboard settings</h2>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-3 dark:bg-slate-900">
            <span className="text-sm font-bold">Dark mode</span>
            <ThemeToggle />
          </div>
          <button className="ghost-button mt-4 w-full" type="button">Reset local data</button>
        </section>
      </div>
    </div>
  );
}
