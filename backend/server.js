import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001; // Changed to 5001 to avoid macOS port 5000 conflict
const DATA_FILE = path.join(__dirname, 'students.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper: Read students from JSON
const readStudents = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper: Write students to JSON
const writeStudents = (students) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
};

// API: Sign in or register student
app.post('/api/signin', (req, res) => {
  try {
    const { name, email, studentId, course } = req.body;

    if (!name || !email || !studentId || !course) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    let students = readStudents();
    
    // Check if student ID or email already exists
    let student = students.find((s) => s.studentId === studentId || s.email === email);

    const currentTime = new Date().toISOString();

    if (student) {
      // Update existing student's latest login session
      student.name = name;
      student.course = course;
      student.loginTime = currentTime;
    } else {
      // Register new student
      student = {
        id: Date.now().toString(),
        name,
        email,
        studentId,
        course,
        loginTime: currentTime
      };
      students.push(student);
    }

    writeStudents(students);
    res.json({ message: 'Success', student });
  } catch (err) {
    res.status(500).json({ error: 'Server error during sign in.' });
  }
});

// API: Get all registered students
app.get('/api/students', (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
});

// Global error protection to keep process alive
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Start Server and keep event loop open (Clean single block)
const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Close other running instances.`);
  } else {
    console.error('Server startup error:', err);
  }
});