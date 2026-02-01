# Campus360

Campus360 is a smart, modular campus management platform, featuring AI-driven attendance, facility/room/equipment booking, cleanliness and usage insights, and real-time data dashboards for students, faculty, and administration.

## Features

- **AI-Based Attendance:** Touchless face recognition system (DeepFace) for quick and accurate attendance logging.
- **Smart Washroom Management:** Track usage and cleanliness, report issues, and monitor washroom status.
- **Library Module:** Manage bookings, usage monitoring, and seat/slot allocation.
- **Sports Facility Booking:** Book equipment, view availability, and monitor current activity.
- **Campus Navigation:** Interactive maps, classroom locators, and statistics on popular routes.
- **Admin Dashboards:** Real-time metrics for attendance, library, sports, washroom, and overall campus analytics.
- **Role-Based Access:** User, admin, and super-admin interfaces for tailored access and controls.
- **Built with:** React, Vite (frontend), FastAPI (backend), modular API design.

## Directory Structure

- `backend/` - FastAPI backend with modular routers (attendance, library, washroom, sports, admin)
- `campus/` - React frontend, dashboards, pages for each module, and admin panels

## Quick Start

> **Note:** Update environment variables for API endpoints before running.

1. Install dependencies in both `backend/` and `campus/`
2. Start FastAPI backend (run `main.py` in `backend/campus 360/`)
3. Start React frontend (run `npm run dev` in `campus/`)

---

*For further details, see code and module files. This README is a summary generated via code analysis.
[See the repository for more](https://github.com/Karanbyte07/hackjnu)*
