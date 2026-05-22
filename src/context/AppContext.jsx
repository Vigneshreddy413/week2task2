import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { analyticsData, initializeStorage, seedApplicants, seedJobs, seedUsers } from '../utils/seedData.js';

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('hirehub_auth') === 'true');
  const [theme, setTheme] = useState(() => localStorage.getItem('hirehub_theme') || 'light');
  const [toast, setToast] = useState(null);
  const [jobs, setJobs] = useState(seedJobs);
  const [applicants, setApplicants] = useState(seedApplicants);
  const [users, setUsers] = useState(seedUsers);
  const [analytics, setAnalytics] = useState(analyticsData);

  useEffect(() => {
    initializeStorage();
    setJobs(readStorage('hirehub_jobs', seedJobs));
    setApplicants(readStorage('hirehub_applicants', seedApplicants));
    setUsers(readStorage('hirehub_users', seedUsers));
    setAnalytics(readStorage('hirehub_analytics', analyticsData));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('hirehub_theme', theme);
  }, [theme]);

  useEffect(() => localStorage.setItem('hirehub_jobs', JSON.stringify(jobs)), [jobs]);
  useEffect(() => localStorage.setItem('hirehub_applicants', JSON.stringify(applicants)), [applicants]);
  useEffect(() => localStorage.setItem('hirehub_users', JSON.stringify(users)), [users]);

  function notify(message, type = 'success') {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 2600);
  }

  function login(email, password) {
    const ok = email.trim().toLowerCase() === 'admin@hirehub.com' && password.trim() === 'admin123';
    if (ok) {
      localStorage.setItem('hirehub_auth', 'true');
      setIsAuthenticated(true);
      notify('Welcome back, Admin');
    } else {
      notify('Use admin@hirehub.com and admin123', 'error');
    }
    return ok;
  }

  function logout() {
    localStorage.removeItem('hirehub_auth');
    setIsAuthenticated(false);
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      theme,
      setTheme,
      toast,
      notify,
      jobs,
      setJobs,
      applicants,
      setApplicants,
      users,
      setUsers,
      analytics,
    }),
    [isAuthenticated, theme, toast, jobs, applicants, users, analytics],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
