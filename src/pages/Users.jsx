import { Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Users() {
  const { users, setUsers, notify } = useApp();
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const filtered = useMemo(() => users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()) &&
    (role === 'All' || user.role === role)
  ), [users, query, role]);

  const columns = [
    { key: 'name', label: 'Name', render: (user) => <div><p className="font-bold">{user.name}</p><p className="text-xs text-slate-500">{user.joined}</p></div> },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (user) => <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">{user.role}</span> },
    { key: 'status', label: 'Activity', render: (user) => <div><p className="font-bold">{user.status}</p><p className="text-xs text-slate-500">{user.lastActive}</p></div> },
    { key: 'actions', label: 'Actions', render: (user) => <button className="icon-button" title="Delete user" onClick={() => {
      setUsers(users.filter((item) => item.id !== user.id));
      notify('User deleted');
    }}><Trash2 size={16} /></button> },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Accounts</p>
        <h1 className="text-3xl font-black">Users</h1>
      </div>
      <section className="glass-panel grid gap-3 rounded-2xl p-4 md:grid-cols-[1fr_220px]">
        <input className="input-shell" placeholder="Search users" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="input-shell" value={role} onChange={(event) => setRole(event.target.value)}>
          {['All', 'Candidate', 'Employer'].map((item) => <option key={item}>{item}</option>)}
        </select>
      </section>
      <DataTable columns={columns} rows={filtered} />
    </div>
  );
}
