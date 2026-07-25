export const INITIAL_USERS = [
  {
    id: 'prof_1',
    name: 'Prof. Dr. Sarah Jenkins',
    role: 'admin',
    email: 'sarah@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Faculty & Head of Computer Science',
    department: 'Faculty of Computer Science & Engineering'
  },
  {
    id: 'student_1',
    name: 'Alex Johnson',
    role: 'student',
    email: 'alex.j@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    grade: 'A',
    status: 'Active',
    overallProgress: 85,
    studentId: 'JE-2026-001'
  },
  {
    id: 'student_2',
    name: 'Maria Garcia',
    role: 'student',
    email: 'm.garcia@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    grade: 'A+',
    status: 'Active',
    overallProgress: 92,
    studentId: 'JE-2026-002'
  },
  {
    id: 'student_3',
    name: 'James Wilson',
    role: 'student',
    email: 'j.wilson@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    grade: 'C',
    status: 'At Risk',
    overallProgress: 45,
    studentId: 'JE-2026-003'
  },
  {
    id: 'student_4',
    name: 'Sophie Chen',
    role: 'student',
    email: 's.chen@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    grade: 'B+',
    status: 'Active',
    overallProgress: 78,
    studentId: 'JE-2026-004'
  },
  {
    id: 'student_5',
    name: 'Ryan Miller',
    role: 'student',
    email: 'r.miller@joineazy.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    grade: 'B-',
    status: 'Inactive',
    overallProgress: 62,
    studentId: 'JE-2026-005'
  }
];

export const INITIAL_ASSIGNMENTS = [
  // --- PAST DEADLINE (Inactive) Assignments ---
  {
    id: 'asg_old_1',
    title: 'Semester 1 Final Report Submission',
    course: 'COMPUTER SCIENCE 101',
    description: 'Submit your semester 1 final report covering data structures, algorithms, and object-oriented programming concepts.',
    dueDate: '2025-12-15',
    dueTime: '11:59 PM',
    driveUrl: 'https://drive.google.com/drive/folders/1M_VjMG-raJH4Rb-WrX4CXhND93JMW3XH',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_2', 'student_3', 'student_4', 'student_5']
  },
  {
    id: 'asg_old_2',
    title: 'Spring Break Assignment: Research Paper',
    course: 'ADVANCED MATHEMATICS',
    description: 'Submit your research paper on calculus applications in machine learning models.',
    dueDate: '2025-03-20',
    dueTime: '05:00 PM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_2', 'student_4']
  },
  {
    id: 'asg_old_3',
    title: 'Lab Experiment: Circuit Analysis',
    course: 'PHYSICS II',
    description: 'Complete and submit your circuit analysis lab report including oscilloscope readings and waveform diagrams.',
    dueDate: '2025-01-10',
    dueTime: '02:00 PM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_3', 'student_5']
  },
  // --- CURRENT (Active) Assignments ---
  {
    id: 'asg_1',
    title: 'Midterm Exam Grading & Solutions',
    course: 'ADVANCED MATHEMATICS',
    description: 'Solve problem set 4 on linear differential equations and submit your complete PDF solutions or Google Doc via the designated Drive folder.',
    dueDate: '2026-07-28',
    dueTime: '05:00 PM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_2', 'student_3', 'student_4', 'student_5']
  },
  {
    id: 'asg_2',
    title: 'Project Submission: Dashboard App',
    course: 'COMPUTER SCIENCE 101',
    description: 'Build a component-based assignment dashboard with double verification submission flow and Tailwind CSS styling. Upload code repo & demo link to Drive.',
    dueDate: '2026-07-29',
    dueTime: '11:30 AM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_2', 'student_3', 'student_4', 'student_5']
  },
  {
    id: 'asg_3',
    title: 'Curriculum Review & UX Analysis',
    course: 'DEPARTMENT SEMINAR',
    description: 'Research paper on modern accessibility standards in education dashboards and interactive student portals.',
    dueDate: '2026-07-31',
    dueTime: '10:00 AM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_2', 'student_4']
  },
  {
    id: 'asg_4',
    title: 'Quiz 4 Release: Electromagnetism',
    course: 'PHYSICS II',
    description: 'Complete numerical exercises 1-12 from Chapter 8. Ensure all formulas and calculation steps are formatted clearly.',
    dueDate: '2026-08-02',
    dueTime: '08:00 AM',
    driveUrl: 'https://drive.google.com/drive/my-drive',
    createdBy: 'prof_1',
    assignedStudentIds: ['student_1', 'student_3', 'student_5']
  }
];

export const INITIAL_SUBMISSIONS = [
  // --- Past Deadline Assignment Submissions (asg_old_1) ---
  {
    id: 'sub_old_1_1',
    assignmentId: 'asg_old_1',
    studentId: 'student_1',
    status: 'submitted',
    submittedAt: '2025-12-10T10:30:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Final report submitted with all chapters completed.',
    grade: 'A'
  },
  {
    id: 'sub_old_1_2',
    assignmentId: 'asg_old_1',
    studentId: 'student_2',
    status: 'submitted',
    submittedAt: '2025-12-12T14:15:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Includes extra credit section on sorting algorithms.',
    grade: 'A+'
  },
  {
    id: 'sub_old_1_3',
    assignmentId: 'asg_old_1',
    studentId: 'student_4',
    status: 'submitted',
    submittedAt: '2025-12-14T09:45:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Submitted on time with complete documentation.',
    grade: 'B+'
  },
  // --- Past Deadline Assignment Submissions (asg_old_2) ---
  {
    id: 'sub_old_2_1',
    assignmentId: 'asg_old_2',
    studentId: 'student_1',
    status: 'submitted',
    submittedAt: '2025-03-18T16:00:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Research paper on gradient descent optimization.',
    grade: 'A'
  },
  {
    id: 'sub_old_2_2',
    assignmentId: 'asg_old_2',
    studentId: 'student_2',
    status: 'submitted',
    submittedAt: '2025-03-19T11:20:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Paper on neural network backpropagation mathematics.',
    grade: 'A+'
  },
  {
    id: 'sub_old_2_3',
    assignmentId: 'asg_old_2',
    studentId: 'student_4',
    status: 'submitted',
    submittedAt: '2025-03-17T13:30:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Focus on linear algebra applications in ML.',
    grade: 'B+'
  },
  // --- Past Deadline Assignment Submissions (asg_old_3) ---
  {
    id: 'sub_old_3_1',
    assignmentId: 'asg_old_3',
    studentId: 'student_1',
    status: 'submitted',
    submittedAt: '2025-01-08T15:45:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Lab report with complete oscilloscope readings.',
    grade: 'A-'
  },
  {
    id: 'sub_old_3_2',
    assignmentId: 'asg_old_3',
    studentId: 'student_3',
    status: 'submitted',
    submittedAt: '2025-01-09T10:00:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Partial submission, some waveforms missing.',
    grade: 'C'
  },
  // --- Current Assignment Submissions ---
  {
    id: 'sub_1',
    assignmentId: 'asg_1',
    studentId: 'student_1',
    status: 'submitted',
    submittedAt: '2026-07-22T14:30:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Attached PDF with complete proofs for questions 1 to 5.',
    grade: null
  },
  {
    id: 'sub_2',
    assignmentId: 'asg_3',
    studentId: 'student_1',
    status: 'submitted',
    submittedAt: '2026-07-23T10:15:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Includes Figma link and component architecture breakdown.',
    grade: null
  },
  {
    id: 'sub_3',
    assignmentId: 'asg_1',
    studentId: 'student_2',
    status: 'submitted',
    submittedAt: '2026-07-21T09:00:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Reviewed and double-checked.',
    grade: null
  },
  {
    id: 'sub_4',
    assignmentId: 'asg_2',
    studentId: 'student_2',
    status: 'submitted',
    submittedAt: '2026-07-23T11:45:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Deployed demo live on Vercel.',
    grade: null
  },
  {
    id: 'sub_5',
    assignmentId: 'asg_3',
    studentId: 'student_2',
    status: 'submitted',
    submittedAt: '2026-07-23T16:00:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Added section on color contrast guidelines.',
    grade: null
  },
  {
    id: 'sub_6',
    assignmentId: 'asg_1',
    studentId: 'student_4',
    status: 'submitted',
    submittedAt: '2026-07-22T18:20:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Uploaded final scanned work.',
    grade: null
  },
  {
    id: 'sub_7',
    assignmentId: 'asg_2',
    studentId: 'student_4',
    status: 'submitted',
    submittedAt: '2026-07-23T12:10:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Tailwind CSS implementation complete.',
    grade: null
  },
  {
    id: 'sub_8',
    assignmentId: 'asg_1',
    studentId: 'student_5',
    status: 'submitted',
    submittedAt: '2026-07-23T08:00:00Z',
    driveSubmissionUrl: 'https://drive.google.com/drive/my-drive',
    notes: 'Submitted draft.',
    grade: null
  }
];
