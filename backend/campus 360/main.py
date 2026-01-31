from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import attendance_opencv   # ✅ AI-based attendance
import washroom
import library
import sports
import admin

app = FastAPI(
    title="Campus360 Backend",
    description="Campus360 Backend with AI-Based Face Recognition Attendance",
    version="1.0.0"
)

# ✅ Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to specific origin in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ---------------- ROUTERS ----------------
app.include_router(attendance_opencv.router)
app.include_router(washroom.router)
app.include_router(library.router)
app.include_router(sports.router)
app.include_router(admin.router)

# ---------------- ROOT ----------------
@app.get("/")
def root():
    return {
        "message": "Campus360 Backend Running Successfully 🚀",
        "modules": [
            "Attendance (AI - DeepFace)",
            "Washroom",
            "Library",
            "Sports",
            "Admin"
        ]
    }
