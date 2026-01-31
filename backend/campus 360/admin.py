from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
def dashboard():
    return {
        "total_students": 1200,
        "attendance_today": "92%",
        "washroom_issues": 4,
        "library_usage": "75%",
        "sports_bookings_today": 18
    }
