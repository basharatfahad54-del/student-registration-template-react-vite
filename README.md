# Student Registration App

A complete, responsive **Student Registration System** built with **React.js**, **Vite** and **Tailwind CSS**.

## Features

- 📝 Registration form with full client-side validation and inline error messages
- ✏️ Add, edit and delete students (with a delete confirmation dialog)
- 🔍 Live, case-insensitive search (name, email, roll number, course)
- 🎯 Course and gender filters with a "Clear Filters" button
- 📊 Dashboard statistics (total, male, female, available courses)
- 💾 Data persisted in `localStorage` — records survive a page refresh
- 📱 Fully responsive dashboard design

## React concepts demonstrated

| Concept | Where |
| --- | --- |
| Rendering lists | `StudentTable` renders rows with `students.map()` |
| Keys | Each row uses the student's unique `id` as its React key |
| Rendering & reconciliation | Adding/editing/deleting updates React state, and the table re-renders |
| Controlled components | All form fields managed with `useState` |
| Uncontrolled components | The optional "Additional Note" field is read with `useRef` |
| Form handling | `onSubmit` + `event.preventDefault()` |
| Validation | Reusable functions in `src/utils/validation.js` |
| Lifting state up | All student data lives in `App.jsx`; children get props + callbacks |
| Search & filter | `.filter()` runs live on every keystroke / dropdown change |

## Project structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── DashboardStats.jsx
│   ├── StudentForm.jsx
│   ├── StudentTable.jsx
│   ├── SearchFilter.jsx
│   └── ConfirmDialog.jsx
├── utils/
│   ├── validation.js
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually <http://localhost:5173>).

## Build for production

```bash
npm run build
npm run preview
```
