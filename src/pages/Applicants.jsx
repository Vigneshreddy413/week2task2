import { Eye, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { useApp } from '../context/AppContext.jsx';

const statuses = ['Pending', 'Shortlisted', 'Interview', 'Hired', 'Rejected'];

export default function Applicants() {
  const { applicants, setApplicants, notify } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => applicants.filter((item) =>
    `${item.name} ${item.role} ${item.email}`.toLowerCase().includes(query.toLowerCase()) &&
    (status === 'All' || item.status === status)
  ), [applicants, query, status]);

  function updateStatus(id, nextStatus) {
    setApplicants(applicants.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    notify(`Application moved to ${nextStatus}`);
  }

  const columns = [
    { key: 'name', label: 'Candidate name', render: (item) => <div><p className="font-bold">{item.name}</p><p className="text-xs text-slate-500">{item.appliedAt}</p></div> },
    { key: 'role', label: 'Applied role' },
    { key: 'experience', label: 'Experience' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (item) => <select className="input-shell py-1" value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}>{statuses.map((value) => <option key={value}>{value}</option>)}</select> },
    { key: 'actions', label: 'Actions', render: (item) => <button className="ghost-button" onClick={() => setSelected(item)}><Eye size={16} />Details</button> },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Pipeline</p>
        <h1 className="text-3xl font-black">Applicants</h1>
      </div>
      <section className="glass-panel grid gap-3 rounded-2xl p-4 md:grid-cols-[1fr_220px]">
        <input className="input-shell" placeholder="Search applicants" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="input-shell" value={status} onChange={(event) => setStatus(event.target.value)}>{['All', ...statuses].map((item) => <option key={item}>{item}</option>)}</select>
      </section>
      <DataTable columns={columns} rows={filtered} />
      <Modal open={Boolean(selected)} title={selected?.name} onClose={() => setSelected(null)}>
        {selected && (
          <div className="grid gap-5 md:grid-cols-[1fr_0.8fr]">
            <div className="grid gap-3">
              <p className="text-sm text-slate-500">{selected.email}</p>
              <h3 className="text-2xl font-black">{selected.role}</h3>
              <p className="font-semibold text-slate-600 dark:text-slate-300">{selected.experience} experience</p>
              <select className="input-shell max-w-xs" value={selected.status} onChange={(event) => updateStatus(selected.id, event.target.value)}>
                {statuses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/10">
              <FileText className="text-blue-600" />
              <p className="mt-4 text-sm font-bold text-slate-500">Resume preview</p>
              <p className="mt-2 text-3xl font-black text-blue-700 dark:text-blue-200">{selected.resumeScore}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Profile match score with role requirements.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
