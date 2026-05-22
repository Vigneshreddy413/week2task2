import { Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function ThemeToggle() {
  const { theme, setTheme } = useApp();
  return (
    <button
      className="icon-button"
      title="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      type="button"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
