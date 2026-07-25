# ✅ Completed: Reorganize AdminDashboard Layout

## Changes Made

### ✅ `src/components/AdminDashboard.jsx`
- Replaced the 4-column metrics grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) with a **two-column flex layout**
- **Left column** (`lg:w-1/3`): 4 metric cards stacked vertically:
  1. Active Assignments
  2. Class Submission Rate
  3. Total Students
  4. Students At Risk (clickable button)
- **Right column** (`lg:w-2/3`): DeadlinesCard component

### ✅ `src/components/DeadlinesCard.jsx`
- Added `useState` for `showAll` toggle
- Set a display limit of **5 deadlines** by default
- When more than 5 assignments exist → shows **"View More"** button
- When expanded → shows **"Show Less"** button
- Card uses `h-full flex flex-col` to stretch to the full height of the parent (matching left metrics column height)
- Task list area uses `flex-1 overflow-y-auto` for scrollable content

## Build Status: ✅ PASS

