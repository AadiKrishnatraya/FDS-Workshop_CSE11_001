import React, { useState } from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  const [student, setStudent] = useState(null);

  const handleLogout = () => {
    setStudent(null);
  };

  return (
    <div className="min-h-[100svh] flex flex-col font-sans portal-container">
      {/* Top Navbar */}
      <header className="border-b border-[var(--border)] sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-base font-bold tracking-tight text-[var(--text-h)] m-0">Student Portal</h1>
            <p className="text-xs text-[var(--text)]">Express + JSON Storage</p>
          </div>
        </div>

        {student && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-[var(--code-bg)] hover:bg-red-500/10 hover:text-red-400 text-[var(--text)] border border-[var(--border)] px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}
      </header>

      {/* Main View Router */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 flex items-center justify-center relative z-10">
        {!student ? (
          <LoginForm onLoginSuccess={(loggedInStudent) => setStudent(loggedInStudent)} />
        ) : (
          <Dashboard student={student} />
        )}
      </main>
    </div>
  );
}