# =======================
# BASIC CAMPUS FEATURES
# =======================

def handle_attendance(user_id):
    return "Your attendance is 92%"

def handle_library():
    return "Library seat booked successfully."

def handle_washroom():
    return "Washroom issue reported. Admin notified."

def handle_sports():
    return "Sports slot booked successfully."

def handle_classroom():
    return "Nearest empty classroom is Room 301."


# =======================
# ANNOUNCEMENTS & NOTICES
# =======================

def today_announcements():
    return (
        "📢 Today's Announcements:\n"
        "- Library will close at 6 PM today\n"
        "- Sports trials at 4 PM"
    )

def exam_notices():
    return "📝 Mid-sem exams start from 10th October."

def library_timing():
    return "📚 Library timing is 9 AM – 6 PM."

def hod_message():
    return "📩 Message from HOD: Maintain minimum 75% attendance."

def class_cancelled():
    return "❌ DBMS class scheduled today is cancelled."


# =======================
# SOCIETIES & CLUBS
# =======================

def active_societies():
    return (
        "🎭 Active Societies:\n"
        "- Tech Society\n"
        "- Cultural Society\n"
        "- Sports Club"
    )

def tech_event():
    return "💻 Tech Society is hosting an AI workshop this Saturday."

def join_cultural():
    return "🎨 You can join Cultural Society via student portal registration."


# =======================
# FRESHER MODE
# =======================

def fresher_help():
    return (
        "👋 Welcome Fresher!\n"
        "I can help you with timetable, attendance rules, campus locations."
    )

def admin_office():
    return "🏢 Admin Office is near Block A, Ground Floor."

def attendance_info():
    return "📊 Minimum 75% attendance is required for exams."

def today_timetable():
    return (
        "📅 Today's Timetable:\n"
        "10–11 Maths\n"
        "11–12 DBMS\n"
        "2–3 Physics"
    )

def next_class():
    return "⏭️ Your next class is DBMS at 11 AM in Room 204."

def free_slot():
    return "🕒 You have a free slot from 12 PM to 2 PM."


# =======================
# FALLBACK / HELP
# =======================

def handle_help():
    return (
        "🤖 I can help you with:\n"
        "- Attendance\n"
        "- Library & sports booking\n"
        "- Announcements & notices\n"
        "- Societies & fresher guidance"
    )
