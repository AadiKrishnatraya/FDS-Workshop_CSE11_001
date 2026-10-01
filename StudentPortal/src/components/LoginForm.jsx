import React, { useState } from 'react';
import { User, Mail, Hash, BookOpen, CheckCircle, ShieldAlert } from 'lucide-react';

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    course: 'Computer Science'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in.');
      }

      onLoginSuccess(data.student);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto glass-card rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 text-left">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-8 text-center text-white">
        <h2 className="text-3xl font-extrabold tracking-tight text-white m-0">Student Portal</h2>
        <p className="text-purple-100 text-sm mt-2">Sign in or register to launch your dashboard</p>
      </div>

      <form onSubmit={handleSignIn} className="p-8 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center space-x-2 animate-shake">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Aadi Krishna"
              className="w-full pl-11 pr-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-[var(--text-h)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@university.edu"
              className="w-full pl-11 pr-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-[var(--text-h)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">Student ID</label>
          <div className="relative">
            <Hash className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleInputChange}
              placeholder="e.g. STU-2026"
              className="w-full pl-11 pr-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-[var(--text-h)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text)] mb-1.5">Enrolled Course</label>
          <div className="relative">
            <BookOpen className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition text-[var(--text-h)]"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 mt-2 cursor-pointer"
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Sign In & Open Dashboard</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}