import cv2
import os
from fastapi import APIRouter
from datetime import datetime
import winsound

router = APIRouter(prefix="/attendance", tags=["Attendance"])

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("face_model.yml")

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# 🔥 Auto-load names from dataset
DATASET_DIR = "dataset"
label_names = [name for name in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, name))]

students = {name: False for name in label_names}
marked_time = {}

# Dummy attendance data for API
user_attendance = {
    1: {"name": "Akshat", "attendance": 92},
    2: {"name": "Ishan", "attendance": 88},
    3: {"name": "User", "attendance": 85}
}

@router.get("/status/{user_id}")
def get_attendance_status(user_id: int):
    if user_id in user_attendance:
        return user_attendance[user_id]
    return {"name": "Unknown", "attendance": 0}


@router.get("/live")
def live_attendance():
    global students, marked_time
    # Reset attendance for new session
    students = {name: False for name in label_names}
    marked_time = {}
    
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        cv2.rectangle(frame, (0, 0), (frame.shape[1], 50), (0, 0, 0), -1)
        cv2.putText(frame, "Campus360 | Attendance System", (20, 35),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

        label_text = "Unknown"
        label_color = (0, 0, 255)

        for (x, y, w, h) in faces:
            face_img = gray[y:y+h, x:x+w]
            label_id, confidence = recognizer.predict(face_img)

            if confidence < 70 and label_id < len(label_names):
                name = label_names[label_id]
                label_text = name
                label_color = (0, 255, 0)

                if not students[name]:
                    students[name] = True
                    marked_time[name] = datetime.now().strftime("%I:%M:%S %p")
                    winsound.Beep(1000, 300)
            else:
                label_text = "Unknown"
                label_color = (0, 0, 255)

            cv2.rectangle(frame, (x, y), (x+w, y+h), label_color, 2)
            cv2.putText(frame, label_text, (x, y-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, label_color, 2)

        cv2.imshow("Attendance Camera", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    return {"status": "Camera closed"}


@router.get("/marked")
def get_marked_attendance():
    """Get real-time marked attendance"""
    marked_students = []
    for name in label_names:
        if students.get(name, False):
            marked_students.append({
                "name": name,
                "time": marked_time.get(name, "N/A"),
                "status": "Present"
            })
    
    return {
        "total_students": len(label_names),
        "marked_count": len(marked_students),
        "marked_students": marked_students,
        "unmarked_count": len(label_names) - len(marked_students)
    }


@router.get("/reset")
def reset_attendance():
    """Reset attendance for new session"""
    global students, marked_time
    students = {name: False for name in label_names}
    marked_time = {}
    return {"status": "Attendance reset successfully"}
