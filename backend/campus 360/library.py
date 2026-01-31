from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/library", tags=["Library"])

library_data = {
    "total_seats": 120,
    "available_seats": 45,
    "charging_points": 20,
    "books_available": 150,
    "bookings": []
}

class BookingRequest(BaseModel):
    user_id: int
    seats: int = 1

@router.get("/status")
def status():
    return library_data

@router.get("/available-seats")
def get_available_seats():
    return {
        "available_seats": library_data["available_seats"],
        "total_seats": library_data["total_seats"],
        "charging_points": library_data["charging_points"]
    }

@router.post("/book")
def book_seat(booking: BookingRequest):
    if library_data["available_seats"] >= booking.seats:
        library_data["available_seats"] -= booking.seats
        library_data["bookings"].append({
            "user_id": booking.user_id,
            "seats": booking.seats
        })
        return {
            "status": "success",
            "message": f"Booked {booking.seats} seat(s)",
            "available_seats": library_data["available_seats"]
        }
    else:
        return {
            "status": "error",
            "message": "Not enough seats available",
            "available_seats": library_data["available_seats"]
        }

@router.get("/bookings/{user_id}")
def get_user_bookings(user_id: int):
    user_bookings = [b for b in library_data["bookings"] if b["user_id"] == user_id]
    return {"bookings": user_bookings, "total_booked": len(user_bookings)}

