import { COURSES } from '../utils/validation.js';

/** Inline SVG icons keep the cards clean without extra dependencies. */
const icons = {
  total: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  male: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6 21 3m0 0h-5.25M21 3v5.25M9 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0 6.75-6.75" />
    </svg>
  ),
  female: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21v-6.75M6.75 21h7.5m-3.75-6a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
    </svg>
  ),
  courses: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 18.75c1.995 0 3.944-.28 5.78-.803M12 15a48.398 48.398 0 0 1-7.74-.375c-.04-.006-.08-.012-.12-.02m.015 3.902a48.966 48.966 0 0 0 6.375.091m-7.565-4.15c0-.434.006-.866.018-1.296m9.762 5.446c.24.03.48.055.72.078m2.283-4.898a48.485 48.485 0 0 1 .02 4.887 48.127 48.127 0 0 1-3.05.335m-12.002-8.61c1.184-.637 2.452-1.147 3.792-1.508m10.83 3.084c-1.22-.64-2.53-1.146-3.912-1.5m4.912.037c1.098-.024 2.187-.09 3.262-.205-3.59-3.977-8.63-6.687-14.36-7.054a6 6 0 0 0-4.66 2.345c1.6.08 3.17.327 4.68.712" />
    </svg>
  ),
};

/** Small helper that renders one summary card. */
function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

/**
 * Dashboard summary cards. The student list lives in App (lifted state)
 * and is passed down here as a prop.
 */
export default function DashboardStats({ students }) {
  const maleCount = students.filter((s) => s.gender === 'Male').length;
  const femaleCount = students.filter((s) => s.gender === 'Female').length;

  const stats = [
    { label: 'Total Registered Students', value: students.length, icon: icons.total, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Male Students', value: maleCount, icon: icons.male, color: 'bg-blue-100 text-blue-600' },
    { label: 'Female Students', value: femaleCount, icon: icons.female, color: 'bg-pink-100 text-pink-600' },
    { label: 'Available Courses', value: COURSES.length, icon: icons.courses, color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <section aria-label="Dashboard statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
