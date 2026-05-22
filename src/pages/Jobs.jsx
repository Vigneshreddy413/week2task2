import { Edit3, Eye, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import Modal from '../components/Modal.jsx';
import { useApp } from '../context/AppContext.jsx';

const statusClass = {
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  Paused: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200',
  Draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

export default function Jobs() {
  const { jobs, setJobs, notify } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [location, setLocation] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || job.category === category) &&
    (status === 'All' || job.status === status) &&
    (location === 'All' || job.location === location)
  ), [jobs, query, category, status, location]);

  const columns = [
    { key: 'title', label: 'Job title', render: (job) => <div><p className="font-bold">{job.title}</p><p className="text-xs text-slate-500">{job.category}</p></div> },
    { key: 'company', label: 'Company' },
    { key: 'location', label: 'Location' },
    { key: 'applicants', label: 'Applicants' },
    { key: 'status', label: 'Status', render: (job) => <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[job.status]}`}>{job.status}</span> },
    { key: 'actions', label: 'Actions', render: (job) => (
      <div className="flex gap-2">
        <button className="icon-button" title="View" onClick={() => setSelected(job)}><Eye size={16} /></button>
        <button className="icon-button" title="Edit" onClick={() => {
          const nextStatus = job.status === 'Active' ? 'Paused' : 'Active';
          setJobs(jobs.map((item) => item.id === job.id ? { ...item, status: nextStatus } : item));
          notify(`${job.title} marked ${nextStatus}`);
        }}><Edit3 size={16} /></button>
        <button className="icon-button" title="Delete" onClick={() => {
          setJobs(jobs.filter((item) => item.id !== job.id));
          notify('Job deleted');
        }}><Trash2 size={16} /></button>
      </div>
    ) },
  ];

  const unique = (key) => ['All', ...new Set(jobs.map((job) => job[key]))];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Management</p>
        <h1 className="text-3xl font-black">Jobs</h1>
      </div>
      <section className="glass-panel grid gap-3 rounded-2xl p-4 md:grid-cols-4">
        <input className="input-shell" placeholder="Search by title" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="input-shell" value={category} onChange={(event) => setCategory(event.target.value)}>{unique('category').map((item) => <option key={item}>{item}</option>)}</select>
        <select className="input-shell" value={status} onChange={(event) => setStatus(event.target.value)}>{['All', 'Active', 'Paused', 'Draft'].map((item) => <option key={item}>{item}</option>)}</select>
        <select className="input-shell" value={location} onChange={(event) => setLocation(event.target.value)}>{unique('location').map((item) => <option key={item}>{item}</option>)}</select>
      </section>
      <DataTable columns={columns} rows={filtered} />
      <Modal open={Boolean(selected)} title={selected?.title} onClose={() => setSelected(null)}>
        {selected && (
          <div className="grid gap-4 sm:grid-cols-2">
            {['company', 'location', 'category', 'status', 'salary', 'postedAt', 'applicants'].map((key) => (
              <div key={key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-bold uppercase text-slate-500">{key}</p>
                <p className="mt-1 font-bold text-slate-950 dark:text-white">{selected[key]}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
