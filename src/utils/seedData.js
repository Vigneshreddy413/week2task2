export const seedJobs = [
  { id: 'job-1', title: 'Senior React Developer', company: 'Nimbus Labs', location: 'Bengaluru', category: 'Engineering', status: 'Active', applicants: 84, postedAt: '2026-05-02', salary: '18-26 LPA' },
  { id: 'job-2', title: 'Product Designer', company: 'PixelForge', location: 'Remote', category: 'Design', status: 'Active', applicants: 51, postedAt: '2026-04-27', salary: '12-18 LPA' },
  { id: 'job-3', title: 'Growth Marketing Lead', company: 'MarketNest', location: 'Hyderabad', category: 'Marketing', status: 'Paused', applicants: 33, postedAt: '2026-04-18', salary: '15-22 LPA' },
  { id: 'job-4', title: 'Data Analyst', company: 'QuantBridge', location: 'Pune', category: 'Analytics', status: 'Active', applicants: 67, postedAt: '2026-05-08', salary: '9-14 LPA' },
  { id: 'job-5', title: 'HR Operations Manager', company: 'PeopleStack', location: 'Chennai', category: 'HR', status: 'Draft', applicants: 18, postedAt: '2026-05-12', salary: '10-16 LPA' },
  { id: 'job-6', title: 'Backend Engineer', company: 'CloudMint', location: 'Delhi NCR', category: 'Engineering', status: 'Active', applicants: 72, postedAt: '2026-05-14', salary: '16-24 LPA' },
];

export const seedApplicants = [
  { id: 'app-1', name: 'Aarav Sharma', role: 'Senior React Developer', experience: '5 years', email: 'aarav.sharma@example.com', status: 'Shortlisted', resumeScore: 91, appliedAt: '2026-05-16' },
  { id: 'app-2', name: 'Meera Iyer', role: 'Product Designer', experience: '4 years', email: 'meera.iyer@example.com', status: 'Interview', resumeScore: 88, appliedAt: '2026-05-15' },
  { id: 'app-3', name: 'Kabir Khan', role: 'Data Analyst', experience: '3 years', email: 'kabir.khan@example.com', status: 'Pending', resumeScore: 76, appliedAt: '2026-05-18' },
  { id: 'app-4', name: 'Nisha Rao', role: 'Backend Engineer', experience: '6 years', email: 'nisha.rao@example.com', status: 'Hired', resumeScore: 94, appliedAt: '2026-05-11' },
  { id: 'app-5', name: 'Vikram Menon', role: 'Growth Marketing Lead', experience: '7 years', email: 'vikram.menon@example.com', status: 'Rejected', resumeScore: 69, appliedAt: '2026-05-06' },
  { id: 'app-6', name: 'Ananya Das', role: 'HR Operations Manager', experience: '5 years', email: 'ananya.das@example.com', status: 'Pending', resumeScore: 82, appliedAt: '2026-05-19' },
];

export const seedUsers = [
  { id: 'usr-1', name: 'Riya Kapoor', email: 'riya@example.com', role: 'Candidate', status: 'Active', joined: '2026-01-10', lastActive: 'Today' },
  { id: 'usr-2', name: 'Arjun Patel', email: 'arjun@cloudmint.com', role: 'Employer', status: 'Active', joined: '2026-02-04', lastActive: '2 hours ago' },
  { id: 'usr-3', name: 'Sneha Nair', email: 'sneha@example.com', role: 'Candidate', status: 'Inactive', joined: '2026-03-14', lastActive: '12 days ago' },
  { id: 'usr-4', name: 'Dev Verma', email: 'dev@nimbuslabs.com', role: 'Employer', status: 'Active', joined: '2026-04-09', lastActive: 'Yesterday' },
  { id: 'usr-5', name: 'Priya Singh', email: 'priya@example.com', role: 'Candidate', status: 'Active', joined: '2026-05-02', lastActive: '15 min ago' },
];

export const analyticsData = {
  monthlyApplications: [
    { month: 'Jan', applications: 220, users: 560, activeJobs: 38 },
    { month: 'Feb', applications: 310, users: 680, activeJobs: 44 },
    { month: 'Mar', applications: 410, users: 790, activeJobs: 52 },
    { month: 'Apr', applications: 530, users: 940, activeJobs: 61 },
    { month: 'May', applications: 690, users: 1130, activeJobs: 74 },
    { month: 'Jun', applications: 760, users: 1290, activeJobs: 82 },
  ],
  activities: [
    'Nimbus Labs posted Senior React Developer',
    'Meera Iyer moved to interview stage',
    'CloudMint upgraded to verified employer',
    '84 new applications reviewed this week',
    'Data Analyst job reached 67 applicants',
  ],
  notifications: [
    '12 applications need review',
    '3 employers awaiting verification',
    'Weekly analytics export is ready',
  ],
};

export function initializeStorage() {
  const entries = [
    ['hirehub_jobs', seedJobs],
    ['hirehub_applicants', seedApplicants],
    ['hirehub_users', seedUsers],
    ['hirehub_analytics', analyticsData],
  ];

  entries.forEach(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value));
  });
}

export function exportJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
