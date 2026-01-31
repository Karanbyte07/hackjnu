import cv2
import os
import numpy as np

DATASET_DIR = "dataset"

recognizer = cv2.face.LBPHFaceRecognizer_create()
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

faces = []
labels = []
label_map = {}
current_label = 0

for person in os.listdir(DATASET_DIR):
    person_path = os.path.join(DATASET_DIR, person)
    if not os.path.isdir(person_path):
        continue

    label_map[current_label] = person

    for img_name in os.listdir(person_path):
        img_path = os.path.join(person_path, img_name)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            continue

        detected = face_cascade.detectMultiScale(img, 1.3, 5)
        for (x, y, w, h) in detected:
            faces.append(img[y:y+h, x:x+w])
            labels.append(current_label)

    current_label += 1

recognizer.train(faces, np.array(labels))
recognizer.save("face_model.yml")

print("✅ Training completed")
print("Label mapping:", label_map)
