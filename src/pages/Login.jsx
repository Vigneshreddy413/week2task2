import { motion } from 'framer-motion';
import { BriefcaseBusiness, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@hirehub.com', password: 'admin123' });

  function submit(event) {
    event.preventDefault();
    if (login(form.email, form.password)) navigate('/');
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#eef4ff] p-4 dark:bg-slate-950">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel grid w-full max-w-5xl overflow-hidden rounded-3xl md:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="relative min-h-[420px] bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-8 text-white">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0 2px, transparent 2px)' }} />
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
              <BriefcaseBusiness size={28} />
            </div>
            <h1 className="mt-16 max-w-md text-4xl font-black tracking-normal sm:text-5xl">HireHub Admin Dashboard</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/78">Monitor applications, employers, job velocity, and growth analytics from one polished admin command center.</p>
          </div>
        </div>
        <form onSubmit={submit} className="bg-white p-8 dark:bg-slate-950">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Secure admin login</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Demo credentials are already filled in.</p>
          <label className="mt-8 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="input-shell w-full pl-10" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
          <label className="mt-5 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="input-shell w-full pl-10" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </div>
          <button className="primary-button mt-8 w-full py-3" type="submit">Sign in to dashboard</button>
        </form>
      </motion.section>
      <Toast />
    </main>
  );
}
