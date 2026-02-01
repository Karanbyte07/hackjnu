from intents import INTENTS

def detect_intent(user_message: str):
    message = user_message.lower()

    for intent, keywords in INTENTS.items():
        for word in keywords:
            if word in message:
                return intent

    return "unknown"
