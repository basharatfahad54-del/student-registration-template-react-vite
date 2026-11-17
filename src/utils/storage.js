/**
 * Small helpers for persisting the student list in localStorage,
 * so records survive a page refresh.
 */

const STORAGE_KEY = 'student-registration-app:students';

/** Reads the saved student list. Returns [] when nothing is saved yet. */
export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupted data or storage unavailable -> start with an empty list.
    return [];
  }
}

/** Saves the student list. Failures (e.g. private browsing) are ignored. */
export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    // Intentionally ignored: the app keeps working without persistence.
  }
}
