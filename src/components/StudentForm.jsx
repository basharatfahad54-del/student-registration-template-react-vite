import { useEffect, useRef, useState } from 'react';
import { COURSES, GENDERS, validateStudent } from '../utils/validation.js';

/** Initial (empty) value of every controlled field. */
const EMPTY_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  rollNumber: '',
  gender: '',
  dob: '',
  course: '',
  address: '',
};

/** Shared input styling - green normal / red when the field has an error. */
function inputClass(hasError) {
  return [
    'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition',
    'placeholder:text-slate-400 focus:ring-2',
    hasError
      ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-200'
      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200',
  ].join(' ');
}

/** Small error text shown under a field. */
function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

/**
 * Registration form.
 *
 * Demonstrates:
 * - CONTROLLED COMPONENTS: every value comes from useState.
 * - UNCONTROLLED COMPONENT: the optional "Additional Note" field is read
 *   from the DOM with useRef instead of being React state.
 * - FORM HANDLING: onSubmit + event.preventDefault().
 * - VALIDATION: reusable validateStudent() from utils, individual errors
 *   clear as soon as the user fixes that field.
 */
export default function StudentForm({ students, editingStudent, onSave, onCancelEdit }) {
  // --- Controlled components: React state is the single source of truth. ---
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // --- Uncontrolled component: optional note read via useRef on submit. ---
  const noteRef = useRef(null);

  const isEditing = Boolean(editingStudent);

  // Fill the form when a student is selected for editing,
  // clear it again when editing is cancelled or finished.
  useEffect(() => {
    if (editingStudent) {
      setValues({
        fullName: editingStudent.fullName,
        email: editingStudent.email,
        phone: editingStudent.phone,
        rollNumber: editingStudent.rollNumber,
        gender: editingStudent.gender,
        dob: editingStudent.dob,
        course: editingStudent.course,
        address: editingStudent.address,
      });
      if (noteRef.current) noteRef.current.value = editingStudent.note || '';
      // Bring the form into view so the user sees the filled data.
      document.getElementById('student-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setValues(EMPTY_VALUES);
      if (noteRef.current) noteRef.current.value = '';
    }
    setErrors({});
  }, [editingStudent]);

  // Auto-hide the success banner after 4 seconds.
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(''), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  /** Generic change handler for every controlled field. */
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear this field's error as soon as the user starts correcting it.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  /** Form submission: validate first, only save when everything is valid. */
  function handleSubmit(event) {
    event.preventDefault(); // stop the browser page reload

    const newErrors = validateStudent(values, students, editingStudent?.id ?? null);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // block submission and show messages
      return;
    }

    // Collect the data, including the uncontrolled note field.
    onSave({
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      rollNumber: values.rollNumber.trim(),
      address: values.address.trim(),
      note: noteRef.current?.value.trim() || '',
    });

    // Reset the form after a successful registration/update.
    setValues(EMPTY_VALUES);
    setErrors({});
    if (noteRef.current) noteRef.current.value = '';
    setSuccessMessage(
      isEditing
        ? 'Student updated successfully!'
        : 'Student registered successfully!'
    );
  }

  return (
    <section
      id="student-form"
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600">
          {isEditing ? '✏️' : '📝'}
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {isEditing ? 'Edit Student' : 'Register New Student'}
          </h2>
          <p className="text-sm text-slate-500">
            {isEditing
              ? `Updating record for roll number ${editingStudent.rollNumber}.`
              : 'Fill in the details below to register a student.'}
          </p>
        </div>
      </div>

      {/* Success banner */}
      {successMessage && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          <span>✅</span>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Full name */}
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Sarah Ahmed"
              value={values.fullName}
              onChange={handleChange}
              className={inputClass(Boolean(errors.fullName))}
            />
            <FieldError message={errors.fullName} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. sarah@example.com"
              value={values.email}
              onChange={handleChange}
              className={inputClass(Boolean(errors.email))}
            />
            <FieldError message={errors.email} />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 03001234567"
              value={values.phone}
              onChange={handleChange}
              className={inputClass(Boolean(errors.phone))}
            />
            <FieldError message={errors.phone} />
          </div>

          {/* Roll number */}
          <div>
            <label htmlFor="rollNumber" className="mb-1 block text-sm font-medium text-slate-700">
              Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              placeholder="e.g. CS-2024-101"
              value={values.rollNumber}
              onChange={handleChange}
              className={inputClass(Boolean(errors.rollNumber))}
            />
            <FieldError message={errors.rollNumber} />
          </div>

          {/* Date of birth */}
          <div>
            <label htmlFor="dob" className="mb-1 block text-sm font-medium text-slate-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={values.dob}
              onChange={handleChange}
              className={inputClass(Boolean(errors.dob))}
            />
            <FieldError message={errors.dob} />
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="mb-1 block text-sm font-medium text-slate-700">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              id="course"
              name="course"
              value={values.course}
              onChange={handleChange}
              className={inputClass(Boolean(errors.course))}
            >
              <option value="">Select a course...</option>
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <FieldError message={errors.course} />
          </div>

          {/* Gender - rendered as a list with keys */}
          <div className="sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Gender <span className="text-red-500">*</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((gender) => (
                <label
                  key={gender}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    values.gender === gender
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={values.gender === gender}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {gender}
                </label>
              ))}
            </div>
            <FieldError message={errors.gender} />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows={1}
              placeholder="e.g. 12 Main Street, Lahore"
              value={values.address}
              onChange={handleChange}
              className={`min-h-[42px] resize-y ${inputClass(Boolean(errors.address))}`}
            />
            <FieldError message={errors.address} />
          </div>
        </div>

        {/* Uncontrolled optional field - value lives in the DOM, read via ref. */}
        <div>
          <label htmlFor="note" className="mb-1 block text-sm font-medium text-slate-700">
            Additional Note <span className="text-xs font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="note"
            type="text"
            ref={noteRef}
            placeholder="e.g. scholarship candidate, transfer student..."
            defaultValue=""
            className={inputClass(false)}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5">
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {isEditing ? 'Update Student' : 'Register Student'}
          </button>
        </div>
      </form>
    </section>
  );
}
