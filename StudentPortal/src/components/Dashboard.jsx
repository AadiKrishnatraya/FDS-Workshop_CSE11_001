import React, { useState, useEffect } from 'react';
import { Users, Award, Clock, GraduationCap, Search, Sparkles } from 'lucide-react';

export default function Dashboard({ student }) {
  const [allStudents, setAllStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setAllStudents(data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  const filteredStudents = allStudents.filter((s) => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn text-left w-full">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 transform translate-x-8 translate-y-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-72 h-72" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/25 backdrop-blur-md text-purple-100 text-xs uppercase tracking-widest font-semibold px-3.5 py-1.5 rounded-full session-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Session Online</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-white tracking-tight">
            Welcome back, {student.name}! 🚀
          </h2>
          <p className="text-purple-100 mt-2 max-w-xl text-sm md:text-base leading-relaxed opacity-90">
            Your login details are live-synced and stored securely in the backend JSON database.
          </p>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 font-bold shadow-inner">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">Student ID</p>
            <p className="text-lg font-extrabold text-[var(--text-h)] mt-0.5">{student.studentId}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 font-bold shadow-inner">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">Enrolled Course</p>
            <p className="text-lg font-extrabold text-[var(--text-h)] mt-0.5">{student.course}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 font-bold shadow-inner">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">Last Login Time</p>
            <p className="text-sm font-extrabold text-[var(--text-h)] mt-0.5">
              {new Date(student.loginTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      {/* Directory Table Section */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 md:p-8 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-h)] m-0">Registered Students Directory</h3>
              <p className="text-xs text-[var(--text)]">Live records loaded from backend server</p>
            </div>
          </div>

          {/* Search Bar & Counter */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition w-full md:w-64 text-[var(--text-h)]"
              />
            </div>
            <span className="bg-purple-500/10 text-[var(--accent)] text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap">
              {filteredStudents.length} {filteredStudents.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text)] text-xs uppercase tracking-wider bg-black/5">
                <th className="py-4 px-6 font-semibold">Student Name</th>
                <th className="py-4 px-6 font-semibold">Student ID</th>
                <th className="py-4 px-6 font-semibold">Email Address</th>
                <th className="py-4 px-6 font-semibold">Enrolled Course</th>
                <th className="py-4 px-6 font-semibold">Sign-in Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[var(--text)]">
                    No matching students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id || s.studentId} className="hover:bg-purple-500/5 transition duration-150">
                    <td className="py-4 px-6 font-semibold text-[var(--text-h)] flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm animate-pulse"></span>
                      <span>{s.name}</span>
                    </td>
                    <td className="py-4 px-6 text-[var(--text)] font-mono text-xs">{s.studentId}</td>
                    <td className="py-4 px-6 text-[var(--text)]">{s.email}</td>
                    <td className="py-4 px-6">
                      <span className="bg-purple-500/10 text-[var(--accent)] text-xs px-3 py-1.5 rounded-xl font-semibold border border-purple-500/20">
                        {s.course}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[var(--text)] text-xs">
                      {new Date(s.loginTime).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}