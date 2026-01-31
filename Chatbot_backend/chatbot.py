from intent_detector import detect_intent
from handlers import *

def chatbot_response(message, user_id):
    intent = detect_intent(message)
    message_lower = message.lower()

    if intent == "attendance_status":
        return handle_attendance(user_id)

    elif intent == "library_booking":
        # Check if user mentioned a specific number of seats
        seats = 1
        for word in message_lower.split():
            if word.isdigit():
                seats = int(word)
                break
        return handle_library(user_id, seats)

    elif intent == "washroom_issue":
        # Extract gender and issue type if mentioned
        gender = "Female" if "female" in message_lower else "Male"
        return handle_washroom(gender, message)

    elif intent == "sports_booking":
        return handle_sports()

    elif intent == "classroom_search":
        return handle_classroom()

    elif intent == "help":
        return handle_help()

    else:
        return "Sorry, I didn't understand. Type 'help' to see what I can do. 😊"
