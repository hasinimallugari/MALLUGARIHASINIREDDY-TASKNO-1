# 🎓 JOINEAZY — Student & Professor Assignment Portal

A role-based assignment management dashboard built with **React**, **Tailwind CSS**, **Lucide Icons**, and **LocalStorage** persistence.

---

## ✨ Core Features

### 1. 🔑 Portal Selection Login
- **Two distinct portals**: *Student Portal* or *Professor Portal*
- Pre-filled credentials for quick demo access
- 1-click sign-in with auto-routing to the correct dashboard

### 2. 🧑‍🏫 Professor Dashboard
- **Real-time metrics cards**:
  - Active Assignments count
  - Overall class submission rate (%)
  - Total enrolled students
  - **Students At Risk** count (clickable to view details)
- **Student Progress Card**: Shows all students with avatars, live progress bars, grades, and status badges (Active / At Risk / Inactive)
- **Deadlines Card**: Upcoming assignment deadlines with Drive material links
- **Assignment Manager**:
  - Create new assignments with title, course, due date/time, description, Google Drive link, and student assignment selection
  - Delete assignments
  - Expandable submission tracking per student (Submitted / Not Submitted, timestamps, Drive links)
  - Grade submissions with letter grades (A+ to F) or numeric scores (0–100)
- **Intervention & Feedback**:
  - Send direct feedback messages tagged as *Encouraging* or *Constructive*
  - Assign remedial tasks and schedule 1-on-1 sessions
  - AI-generated intervention suggestions for at-risk students

### 3. 👨‍🎓 Student Dashboard
- **Personalized view**: Students see only their own assigned tasks
- **Progress gauge**: Circular progress widget showing completion percentage
- **Task filters**: All Tasks / Pending / Submitted
- **2-Step Double-Verification Submission**:
  - **Step 1**: Enter Google Drive submission link and confirm file permissions
  - **Step 2**: Final confirmation screen with celebration confetti animation
- **Reference material**: Clickable links to professor's Drive folders for each assignment

### 4. 📋 Student Directory
- Grade-sorted (top-to-bottom) performance directory
- Displays rank, student info, completion progress bar, grade, and status

---

## 🏗️ Component Architecture

```
task1/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                    # App entry point
│   ├── index.css                   # Tailwind & design tokens
│   ├── App.jsx                     # Root layout, auth router & directory
│   ├── context/
│   │   └── AppContext.jsx          # Global state, auth, CRUD, LocalStorage sync
│   ├── data/
│   │   └── initialData.js          # Seed data (users, assignments, submissions)
│   └── components/
│       ├── LoginPage.jsx           # Student / Professor portal selector
│       ├── Navbar.jsx              # Brand, navigation tabs, user badge, logout
│       ├── AdminDashboard.jsx      # Professor: metrics, assignments, grading
│       ├── StudentDashboard.jsx    # Student: task list, progress, submission
│       ├── StudentProgressCard.jsx # Progress table with "View All" modal
│       ├── DeadlinesCard.jsx       # Upcoming deadlines sidebar card
│       ├── InterventionCard.jsx    # Feedback messaging & action card
│       ├── SubmissionModal.jsx     # 2-step double-verification submission
│       ├── CreateAssignmentModal.jsx # Assignment creation form
│       ├── GradeSubmissionModal.jsx  # Grade assignment (letter/score)
│       └── Toast.jsx               # Notification toasts
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# 3. Production build
npm run build
```

---

## 📊 How Grades & Performance Are Determined

### Student Grades (Static Profile Data)
Each student has a **pre-assigned grade** stored in the seed data (`initialData.js`). These represent the student's current academic standing and are **not auto-calculated** from submissions:

| Student        | Grade |
|----------------|-------|
| Alex Johnson   | A     |
| Maria Garcia   | A+    |
| James Wilson   | C     |
| Sophie Chen    | B+    |
| Ryan Miller    | B-    |

Professors can also assign grades to individual **submissions** via the *Grade Submission Modal*, choosing between:
- **Letter grades**: A+, A, B+, B, B-, C+, C, D, F
- **Numeric scores**: 0–100 (e.g., 100 Excellent, 80 Good, 65 Pass, 0 No Submission)

These grades are stored on the submission record and displayed inside the expanded assignment drawer.

### Overall Progress (Dynamically Calculated)
`getStudentOverallProgress(studentId)` computes:

> **(Number of assigned tasks submitted ÷ Total assigned tasks) × 100**

Example: If a student has 3 assignments assigned and has submitted 2, their progress is **66%**.

### Student Status (Dynamically Calculated)
`getStudentStatus(studentId)` uses the progress percentage:

| Progress Range | Status       | Color   |
|----------------|--------------|---------|
| 0%             | Inactive     | Gray    |
| 1% – 49%      | **At Risk**  | Rose    |
| 50% – 100%    | Active       | Emerald |

The "Students At Risk" metric card on the Professor Dashboard is **clickable** and opens a modal listing all at-risk students with their details.

### Class Submission Rate (Professor Dashboard)

> **(Total submitted assignments across all students ÷ Total possible submissions) × 100**

Reflects the overall class engagement level.

### Student Directory Sorting
In the *Student Directory* tab, students are sorted **top-to-bottom by grade rank** (A+ → F), then by descending overall progress as tiebreaker.

---

## 🔐 Demo Credentials

| Role      | Email                  | Password      |
|-----------|------------------------|---------------|
| Professor | faculty@joineazy.edu   | password123   |
| Student   | alex.j@joineazy.edu    | password123   |

