# Student Registration App

A complete, responsive **Student Registration System** built with **React.js**, **Vite** and **Tailwind CSS**.

## 💼 Contact for Services

Need a custom web application, an AI-powered product (ChatGPT chatbot, AI SaaS) or a full-stack solution for your business? Let's work together:

<p>
  <a href="https://www.linkedin.com/in/muhammad-fahad-8b6258370/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/LinkedIn-Connect%20with%20me-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn - Muhammad Fahad" />
  </a>
  <a href="https://www.fiverr.com/fahadvine1/develop-custom-ai-web-app-chatgpt-chatbot-or-ai-saas-application" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Fiverr-Hire%20me%20on%20Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white" alt="Fiverr - Muhammad Fahad" />
  </a>
</p>

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
