import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  ASSIGNMENTS: 'joineazy_lms_assignments_v6',
  SUBMISSIONS: 'joineazy_lms_submissions_v6',
  CURRENT_USER: 'joineazy_lms_current_user_v6',
  USERS: 'joineazy_lms_users_v6',
  IS_AUTH: 'joineazy_lms_is_auth_v6'
};

export const AppProvider = ({ children }) => {
  // Users state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USERS;
  });

  // Authentication state — always starts as false so login page shows on every load
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Current user state (defaults to Prof. Dr. Sarah Jenkins)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      } catch (e) {
        const found = INITIAL_USERS.find(u => u.id === saved);
        if (found) return found;
      }
    }
    return INITIAL_USERS[0]; // Prof. Dr. Sarah Jenkins (admin)
  });

  // Assignments state
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ASSIGNMENTS;
  });

  // Submissions state
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SUBMISSIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  // Auth state is intentionally NOT persisted — login page shows on every fresh load

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Login Function - Guarantees Lecturer / Professor vs Student Dashboard
  const login = (emailInput, passwordInput, requiredRole = 'student') => {
    const cleanEmail = emailInput ? emailInput.trim().toLowerCase() : '';

    let baseUser;

    if (!cleanEmail || cleanEmail === 'faculty@joineazy.edu' || cleanEmail === 'professor@joineazy.edu') {
      baseUser = requiredRole === 'admin' 
        ? (users.find(u => u.role === 'admin') || INITIAL_USERS[0])
        : (users.find(u => u.role === 'student') || INITIAL_USERS[1]);
    } else {
      baseUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (!baseUser) {
      const namePart = cleanEmail.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const formattedName = requiredRole === 'admin' ? `Prof. ${capitalized}` : capitalized;
      
      baseUser = {
        id: `user_${Date.now()}`,
        name: formattedName,
        role: requiredRole,
        email: cleanEmail,
        password: passwordInput || 'password123',
        avatar: requiredRole === 'admin'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        grade: 'A',
        status: 'Active',
        overallProgress: 100
      };

      setUsers(prev => [baseUser, ...prev]);

      if (requiredRole === 'student') {
        setAssignments(prev => prev.map(asg => ({
          ...asg,
          assignedStudentIds: [...new Set([...asg.assignedStudentIds, baseUser.id])]
        })));
      }
    }

    // Force exact role for portal selected!
    const activeUser = { ...baseUser, role: requiredRole };

    // Update state and persistence synchronously
    setCurrentUser(activeUser);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(activeUser));
    localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');

    showToast(`Signed in to ${requiredRole === 'admin' ? 'Professor Dashboard' : 'Student Workspace'} as ${activeUser.name}!`, 'success');
    return true;
  };

  // Logout Function
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(INITIAL_USERS[0]);
    showToast('Logged out of Joineazy Portal', 'info');
  };

  // Switch User directly inside authenticated workspace
  const switchUser = (userId) => {
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      showToast(`Switched view to ${targetUser.name} (${targetUser.role === 'admin' ? 'PROFESSOR' : 'STUDENT'})`, 'info');
    }
  };

  // Create Assignment (Faculty Action)
  const createAssignment = (newAssignmentData) => {
    const newAssignment = {
      id: `asg_${Date.now()}`,
      title: newAssignmentData.title,
      course: newAssignmentData.course.toUpperCase(),
      description: newAssignmentData.description,
      dueDate: newAssignmentData.dueDate,
      dueTime: newAssignmentData.dueTime || '11:30 AM',
      driveUrl: newAssignmentData.driveUrl || 'https://drive.google.com/drive/folders/joineazy_sample',
      createdBy: currentUser.id,
      assignedStudentIds: newAssignmentData.assignedStudentIds || users.filter(u => u.role === 'student').map(s => s.id)
    };

    setAssignments(prev => [newAssignment, ...prev]);
    showToast(`Assignment "${newAssignment.title}" published to Joineazy Portal!`, 'success');
  };

  // Delete Assignment
  const deleteAssignment = (assignmentId) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    setSubmissions(prev => prev.filter(s => s.assignmentId !== assignmentId));
    showToast('Assignment removed successfully', 'info');
  };

  // Submit Assignment (Student Double Verification Flow Action)
  const submitAssignment = ({ assignmentId, studentId, driveSubmissionUrl, notes }) => {
    const targetStudentId = studentId || currentUser.id;
    const existingIndex = submissions.findIndex(
      s => s.assignmentId === assignmentId && s.studentId === targetStudentId
    );

    const submissionData = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub_${Date.now()}`,
      assignmentId,
      studentId: targetStudentId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      driveSubmissionUrl: driveSubmissionUrl || 'https://drive.google.com/file/d/joineazy_student_submission',
      notes: notes || 'Submitted via Joineazy portal'
    };

    if (existingIndex >= 0) {
      setSubmissions(prev => {
        const copy = [...prev];
        copy[existingIndex] = submissionData;
        return copy;
      });
    } else {
      setSubmissions(prev => [submissionData, ...prev]);
    }

    const assignmentObj = assignments.find(a => a.id === assignmentId);
    showToast(`Successfully double-verified & submitted "${assignmentObj ? assignmentObj.title : 'Assignment'}"!`, 'success');
  };

  // Reset demo state
  const resetToDefaultData = () => {
    setUsers(INITIAL_USERS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setCurrentUser(INITIAL_USERS[0]);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
    localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.IS_AUTH);
    showToast('Joineazy Portal reset to default state', 'info');
  };

  const getStudentSubmissions = (studentId) => {
    return submissions.filter(s => s.studentId === studentId);
  };

  const getAssignmentSubmissions = (assignmentId) => {
    return submissions.filter(s => s.assignmentId === assignmentId);
  };

  const getSubmissionById = (submissionId) => {
    return submissions.find(s => s.id === submissionId) || null;
  };

  // Grade a submission (Faculty Action)
  const gradeSubmission = (submissionId, grade) => {
    setSubmissions(prev => prev.map(s => 
      s.id === submissionId ? { ...s, grade } : s
    ));
    showToast(`Submission graded: ${grade}`, 'success');
  };

  const getAssignmentProgress = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return { submittedCount: 0, totalCount: 0, percentage: 0 };

    const totalStudents = assignment.assignedStudentIds.length;
    if (totalStudents === 0) return { submittedCount: 0, totalCount: 0, percentage: 0 };

    const submittedCount = submissions.filter(
      s => s.assignmentId === assignmentId && s.status === 'submitted'
    ).length;

    const percentage = Math.round((submittedCount / totalStudents) * 100);
    return { submittedCount, totalCount: totalStudents, percentage };
  };

  const getStudentOverallProgress = (studentId) => {
    const assigned = assignments.filter(a => a.assignedStudentIds.includes(studentId));
    if (assigned.length === 0) return 100;

    const submittedAssignedCount = assigned.filter(a => 
      submissions.some(s => s.assignmentId === a.id && s.studentId === studentId && s.status === 'submitted')
    ).length;

    return Math.round((submittedAssignedCount / assigned.length) * 100);
  };

  // Dynamic student status based on live submission rate:
  // 0%        → Inactive
  // 1–49%     → At Risk
  // 50–100%   → Active
  const getStudentStatus = (studentId) => {
    const progress = getStudentOverallProgress(studentId);
    if (progress === 0) return 'Inactive';
    if (progress < 50) return 'At Risk';
    return 'Active';
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      isAuthenticated,
      login,
      logout,
      switchUser,
      assignments,
      submissions,
      createAssignment,
      deleteAssignment,
      submitAssignment,
      resetToDefaultData,
      getStudentSubmissions,
      getAssignmentSubmissions,
      getSubmissionById,
      gradeSubmission,
      getAssignmentProgress,
      getStudentOverallProgress,
      getStudentStatus,
      searchQuery,
      setSearchQuery,
      activeTab,
      setActiveTab,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
