import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import DashboardStats from './components/DashboardStats.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import SearchFilter from './components/SearchFilter.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import { loadStudents, saveStudents } from './utils/storage.js';

/** Generates a unique id for every student record. */
function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Root component.
 *
 * LIFTING STATE UP: the student list (and every piece of shared state)
 * lives HERE in the parent. Child components receive data through props
 * and report changes back through callback props, so the table, the
 * stats and the form always stay in sync.
 */
export default function App() {
  // Loaded once from localStorage when the app starts.
  const [students, setStudents] = useState(loadStudents);
  const [editingStudent, setEditingStudent] = useState(null); // student being edited, or null
  const [pendingDelete, setPendingDelete] = useState(null); // student awaiting delete confirmation

  // Search & filter state (used by SearchFilter and the table message).
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  // Persist to localStorage whenever the student list changes.
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  /* ------------------------- CRUD operations ------------------------- */

  function handleSaveStudent(data) {
    if (editingStudent) {
      // Immutable update for edit: map -> replace only the edited record.
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudent.id ? { ...student, ...data } : student
        )
      );
      setEditingStudent(null);
    } else {
      // Immutable update for add: spread into a new array with a unique id.
      const newStudent = { id: createId(), ...data };
      setStudents((prev) => [...prev, newStudent]);
    }
  }

  function handleCancelEdit() {
    setEditingStudent(null);
  }

  function handleConfirmDelete() {
    // Immutable delete: filter out the record.
    setStudents((prev) => prev.filter((student) => student.id !== pendingDelete.id));
    // If the deleted student was being edited, leave edit mode.
    setEditingStudent((current) => (current?.id === pendingDelete.id ? null : current));
    setPendingDelete(null);
  }

  /* ---------------------- Search & filtering ----------------------- */

  // filter() runs whenever the list, search text or dropdowns change.
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesQuery =
        !query ||
        student.fullName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);
      const matchesCourse = courseFilter === 'All' || student.course === courseFilter;
      const matchesGender = genderFilter === 'All' || student.gender === genderFilter;
      return matchesQuery && matchesCourse && matchesGender;
    });
  }, [students, search, courseFilter, genderFilter]);

  function handleClearFilters() {
    setSearch('');
    setCourseFilter('All');
    setGenderFilter('All');
  }

  /* ---------------------------- Rendering ---------------------------- */

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary cards - data flows down from the parent state. */}
        <DashboardStats students={students} />

        {/* Registration form */}
        <StudentForm
          students={students}
          editingStudent={editingStudent}
          onSave={handleSaveStudent}
          onCancelEdit={handleCancelEdit}
        />

        {/* Search & filters */}
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          courseFilter={courseFilter}
          onCourseFilterChange={setCourseFilter}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Students table */}
        <StudentTable
          students={filteredStudents}
          totalStudents={students.length}
          onEdit={setEditingStudent}
          onDeleteRequest={setPendingDelete}
        />
      </main>

      <footer className="py-6 text-center text-sm text-slate-400">
        Student Registration System · Built with React &amp; Tailwind CSS
      </footer>

      {/* Delete confirmation modal (only rendered when needed) */}
      {pendingDelete && (
        <ConfirmDialog
          student={pendingDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
