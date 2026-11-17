/** Colour badges for each course (full class strings so Tailwind can detect them). */
const courseBadgeColors = {
  'React.js': 'bg-cyan-100 text-cyan-700',
  JavaScript: 'bg-amber-100 text-amber-700',
  'HTML & CSS': 'bg-violet-100 text-violet-700',
  Python: 'bg-emerald-100 text-emerald-700',
};

/** Small pill shown under the # column / beside the name. */
function GenderBadge({ gender }) {
  const color =
    gender === 'Male'
      ? 'bg-blue-100 text-blue-700'
      : gender === 'Female'
        ? 'bg-pink-100 text-pink-700'
        : 'bg-slate-200 text-slate-700';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {gender}
    </span>
  );
}

/** Initials avatar for the student name cell. */
function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
      {initials}
    </span>
  );
}

/**
 * Registered students table.
 * - Renders rows with students.map() (rendering lists).
 * - Each row uses the student's unique id as the React key.
 * - React re-renders the rows automatically whenever the students prop
 *   changes (rendering & reconciliation).
 */
export default function StudentTable({ students, totalStudents, onEdit, onDeleteRequest }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600">
            📋
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Registered Students</h2>
            <p className="text-sm text-slate-500">
              Showing {students.length} of {totalStudents} student{totalStudents === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        /* Friendly empty states */
        <div className="px-6 pb-10 pt-4 text-center">
          <p className="text-4xl">{totalStudents === 0 ? '🗂️' : '🔍'}</p>
          <p className="mt-3 font-semibold text-slate-700">
            {totalStudents === 0
              ? 'No students registered yet'
              : 'No matching students found'}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {totalStudents === 0
              ? 'Use the registration form above to add your first student.'
              : 'Try a different search term or clear the filters to see all students.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Roll Number</th>
                <th scope="col" className="px-6 py-3">Gender</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id} // unique id as key - never the array index
                  className="border-b border-slate-100 transition last:border-0 hover:bg-indigo-50/50"
                >
                  <td className="px-6 py-3 font-medium text-slate-400">{index + 1}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.fullName} />
                      <div>
                        <p className="font-semibold text-slate-800">{student.fullName}</p>
                        {student.note && (
                          <p className="text-xs text-slate-400" title={student.note}>
                            📝 {student.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{student.email}</td>
                  <td className="px-6 py-3 text-slate-600">{student.phone}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700">
                      {student.rollNumber}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <GenderBadge gender={student.gender} />
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        courseBadgeColors[student.course] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        aria-label={`Edit ${student.fullName}`}
                        className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteRequest(student)}
                        aria-label={`Delete ${student.fullName}`}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
