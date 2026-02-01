from intent_detector import detect_intent
from handlers import *
from handlers import today_announcements, free_slot, exam_notices, library_timing, hod_message, class_cancelled
from handlers import active_societies, tech_event, join_cultural
from handlers import fresher_help, admin_office, attendance_info, today_timetable, next_class


def chatbot_response(message, user_id):
    intent = detect_intent(message)

    # ===== BASIC FEATURES =====
    if intent == "attendance_status":
        return handle_attendance(user_id)

    elif intent == "library_booking":
        return handle_library()

    elif intent == "washroom_issue":
        return handle_washroom()

    elif intent == "sports_booking":
        return handle_sports()

    elif intent == "classroom_search":
        return handle_classroom()

    # ===== ANNOUNCEMENTS =====
    elif intent == "today_announcements":
        return today_announcements()

    elif intent == "exam_notices":
        return exam_notices()

    elif intent == "library_timing":
        return library_timing()

    elif intent == "hod_message":
        return hod_message()

    elif intent == "class_cancelled":
        return class_cancelled()

    # ===== SOCIETIES =====
    elif intent == "active_societies":
        return active_societies()

    elif intent == "tech_event":
        return tech_event()

    elif intent == "join_cultural":
        return join_cultural()

    # ===== FRESHER MODE =====
    elif intent == "fresher_help":
        return fresher_help()

    elif intent == "admin_office":
        return admin_office()

    elif intent == "attendance_info":
        return attendance_info()

    elif intent == "today_timetable":
        return today_timetable()

    elif intent == "next_class":
        return next_class()

    elif intent == "free_slot":
        return free_slot()

    # ===== HELP / FALLBACK =====
    elif intent == "help":
        return handle_help()

    else:
        return (
            "🤖 I didn’t understand that or you can type 'help' in the chat.\n"
            "You can ask me about attendance, library, sports, "
            "announcements, societies, or fresher help."
        )
