/**
 * Reusable validation helpers for the Student Registration form.
 * Keeping these functions in one place avoids duplication and makes
 * the rules easy to test and update.
 */

/** Courses offered (shared by the form, the filter dropdown and the stats). */
export const COURSES = ['React.js', 'JavaScript', 'HTML & CSS', 'Python'];

/** Gender options (shared by the form and the filter dropdown). */
export const GENDERS = ['Male', 'Female', 'Other'];

/** Simple email format check. */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates the whole student form and returns an object of error messages.
 * An empty object means the data is valid.
 *
 * @param {object} values      - All controlled form field values.
 * @param {Array}  students    - Current student list (used for roll-number uniqueness).
 * @param {string|null} currentId - Id of the student being edited (so a student
 *                               can keep their own roll number), or null when adding.
 */
export function validateStudent(values, students, currentId = null) {
  const errors = {};

  // Full name: required, min 3 characters.
  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must contain at least 3 characters.';
  }

  // Email: required, valid format.
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  // Phone: required, must contain 10-15 digits (formatting characters allowed).
  const digitCount = values.phone.replace(/\D/g, '').length;
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (digitCount < 10 || digitCount > 15) {
    errors.phone = 'Phone number must contain 10-15 digits.';
  }

  // Roll number: required and unique across all registered students.
  if (!values.rollNumber.trim()) {
    errors.rollNumber = 'Roll number is required.';
  } else {
    const rollNumber = values.rollNumber.trim().toLowerCase();
    const isDuplicate = students.some(
      (student) =>
        student.rollNumber.toLowerCase() === rollNumber && student.id !== currentId
    );
    if (isDuplicate) {
      errors.rollNumber = `Roll number "${values.rollNumber.trim()}" is already registered.`;
    }
  }

  // Gender: required.
  if (!values.gender) {
    errors.gender = 'Please select a gender.';
  }

  // Date of birth: required, valid date, not in the future.
  if (!values.dob) {
    errors.dob = 'Date of birth is required.';
  } else {
    const date = new Date(values.dob);
    if (Number.isNaN(date.getTime())) {
      errors.dob = 'Please enter a valid date.';
    } else if (date > new Date()) {
      errors.dob = 'Date of birth cannot be in the future.';
    }
  }

  // Course: required.
  if (!values.course) {
    errors.course = 'Please select a course.';
  }

  // Address: required, min 5 characters.
  if (!values.address.trim()) {
    errors.address = 'Address is required.';
  } else if (values.address.trim().length < 5) {
    errors.address = 'Address must contain at least 5 characters.';
  }

  return errors;
}
