/**
 * Confirmation modal shown before deleting a student.
 * Rendered conditionally by App only when a student is pending deletion.
 */
export default function ConfirmDialog({ student, onConfirm, onCancel }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onCancel} // clicking the dark backdrop cancels
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()} // clicks inside must not close it
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
            ⚠️
          </span>
          <div>
            <h3 id="confirm-dialog-title" className="text-lg font-bold text-slate-800">
              Delete this student?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              You are about to permanently delete{' '}
              <strong className="text-slate-700">{student.fullName}</strong> (roll number{' '}
              <strong className="text-slate-700">{student.rollNumber}</strong>). This action cannot be
              undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
