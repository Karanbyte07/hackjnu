import requests
import json

# Backend API URL
BACKEND_URL = "http://localhost:8000"

def handle_attendance(user_id):
    """Fetch and return user's attendance status"""
    try:
        response = requests.get(f"{BACKEND_URL}/attendance/status/{user_id}")
        if response.status_code == 200:
            data = response.json()
            attendance = data.get("attendance", "N/A")
            return f"Your attendance is {attendance}%"
        return "Unable to fetch attendance. Please try again."
    except Exception as e:
        return f"Error checking attendance: {str(e)}"

def handle_library(user_id=None, seat_count=1):
    """Handle library seat booking"""
    try:
        # First, check availability
        response = requests.get(f"{BACKEND_URL}/library/available-seats")
        if response.status_code == 200:
            data = response.json()
            available = data.get("available_seats", 0)
            
            if available >= seat_count:
                # Book the seat
                book_response = requests.post(
                    f"{BACKEND_URL}/library/book",
                    json={"user_id": user_id, "seats": seat_count}
                )
                if book_response.status_code == 200:
                    return f"✅ Library seat booked successfully! {seat_count} seat(s) reserved. Available seats now: {available - seat_count}"
                return "Failed to book seat. Please try again."
            else:
                return f"❌ Sorry, only {available} seat(s) available. You requested {seat_count}."
        return "Unable to check library availability."
    except Exception as e:
        return f"Error booking library seat: {str(e)}"

def handle_washroom(gender="Female", issue=""):
    """Handle washroom issue reporting"""
    try:
        response = requests.post(
            f"{BACKEND_URL}/washroom/report",
            json={"gender": gender, "issue": issue if issue else "General issue"}
        )
        if response.status_code == 200:
            data = response.json()
            priority = data.get("priority", "NORMAL")
            return f"✅ Washroom issue reported! Priority: {priority}. Admin has been notified."
        return "Failed to report washroom issue."
    except Exception as e:
        return f"Error reporting washroom issue: {str(e)}"

def handle_sports(sport="", date=""):
    """Handle sports booking"""
    try:
        response = requests.post(
            f"{BACKEND_URL}/sports/book",
            json={"sport": sport if sport else "general", "date": date}
        )
        if response.status_code == 200:
            return f"✅ Sports slot booked successfully! Check your email for confirmation."
        return "Failed to book sports slot. Please try again."
    except Exception as e:
        return f"Error booking sports: {str(e)}"

def handle_classroom():
    """Find empty classrooms"""
    try:
        response = requests.get(f"{BACKEND_URL}/classroom/empty")
        if response.status_code == 200:
            data = response.json()
            classrooms = data.get("empty_classrooms", [])
            if classrooms:
                return f"📚 Empty classrooms available: {', '.join(classrooms)}"
            return "No empty classrooms available right now."
        return "Unable to fetch classroom data."
    except Exception as e:
        return f"Error finding classrooms: {str(e)}"

def handle_help():
    return (
        "🤖 Campus360 Assistant can help you with:\n\n"
        "📋 **Attendance** - Check your attendance status\n"
        "📚 **Library** - Book study seats\n"
        "🏐 **Sports** - Book sports slots\n"
        "🚽 **Washroom** - Report hygiene issues\n"
        "🏛️ **Classroom** - Find empty classrooms\n\n"
        "Just ask me! e.g., 'book a library seat' or 'check my attendance'"
    )

