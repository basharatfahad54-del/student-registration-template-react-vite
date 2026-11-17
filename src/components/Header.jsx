/**
 * Top navigation / header section of the dashboard.
 * Purely presentational - it receives no state.
 */
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl ring-1 ring-white/30">
            🎓
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Student Registration System
            </h1>
            <p className="text-sm text-indigo-100">
              Register, manage, search and filter student records with ease.
            </p>
          </div>
        </div>

        {/* Optional quick info */}
        <nav className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1.5 font-medium ring-1 ring-white/25">
            Dashboard
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 font-medium ring-1 ring-white/25">
            Students
          </span>
          <span className="hidden rounded-full bg-white/15 px-3 py-1.5 font-medium ring-1 ring-white/25 sm:inline">
            Courses
          </span>
        </nav>
      </div>
    </header>
  );
}
