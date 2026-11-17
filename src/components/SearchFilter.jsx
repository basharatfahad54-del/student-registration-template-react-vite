import { COURSES, GENDERS } from '../utils/validation.js';

/** Shared styling for the dropdowns so they match the search input. */
const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:w-auto';

/**
 * Live search box plus course/gender filter dropdowns.
 * All values are CONTROLLED - the actual state lives in App (lifted state up).
 */
export default function SearchFilter({
  search,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  genderFilter,
  onGenderFilterChange,
  onClearFilters,
}) {
  const hasActiveFilters = search.trim() !== '' || courseFilter !== 'All' || genderFilter !== 'All';

  return (
    <section
      aria-label="Search and filters"
      className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Live search - filters as the user types (case-insensitive). */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email, roll number or course..."
            aria-label="Search students"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Course filter */}
        <select
          value={courseFilter}
          onChange={(event) => onCourseFilterChange(event.target.value)}
          aria-label="Filter by course"
          className={selectClass}
        >
          <option value="All">All Courses</option>
          {COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        {/* Gender filter */}
        <select
          value={genderFilter}
          onChange={(event) => onGenderFilterChange(event.target.value)}
          aria-label="Filter by gender"
          className={selectClass}
        >
          <option value="All">All Genders</option>
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        {/* Clear all filters */}
        <button
          type="button"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition enabled:hover:border-red-300 enabled:hover:bg-red-50 enabled:hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Filters
        </button>
      </div>

      {hasActiveFilters && (
        <p className="text-xs text-slate-500">
          Filters are active - showing students matching your search and selections.
        </p>
      )}
    </section>
  );
}
