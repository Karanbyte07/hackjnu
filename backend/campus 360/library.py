from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

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


class SeatAvailabilityRequest(BaseModel):
    seats: int
    power_socket: bool


class SeatBookingRequest(BaseModel):
    seat_id: str
    time_slot: str
    duration: str
    floor: int
    section: str

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


@router.post("/check-availability")
def check_seat_availability(request: SeatAvailabilityRequest):
    """Check available study seats based on requirements"""
    available_seats_data = []
    
    # Dummy data for available seats
    if request.power_socket:
        available_seats_data = [
            {
                "seat_id": "B-12",
                "floor": 1,
                "section": "B",
                "has_power": True,
                "is_window_seat": False,
                "available_slots": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM", "5:00 PM - 8:00 PM"]
            },
            {
                "seat_id": "A-05",
                "floor": 1,
                "section": "A",
                "has_power": True,
                "is_window_seat": True,
                "available_slots": ["10:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"]
            },
            {
                "seat_id": "C-18",
                "floor": 2,
                "section": "C",
                "has_power": True,
                "is_window_seat": False,
                "available_slots": ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM", "4:00 PM - 7:00 PM"]
            },
            {
                "seat_id": "D-22",
                "floor": 2,
                "section": "D",
                "has_power": True,
                "is_window_seat": True,
                "available_slots": ["11:00 AM - 2:00 PM", "3:00 PM - 6:00 PM"]
            }
        ]
    else:
        available_seats_data = [
            {
                "seat_id": "E-30",
                "floor": 1,
                "section": "E",
                "has_power": False,
                "is_window_seat": True,
                "available_slots": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM", "5:00 PM - 8:00 PM"]
            },
            {
                "seat_id": "F-45",
                "floor": 2,
                "section": "F",
                "has_power": False,
                "is_window_seat": False,
                "available_slots": ["10:00 AM - 1:00 PM", "1:00 PM - 4:00 PM", "4:00 PM - 7:00 PM"]
            },
            {
                "seat_id": "G-52",
                "floor": 3,
                "section": "G",
                "has_power": False,
                "is_window_seat": True,
                "available_slots": ["9:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"]
            },
            {
                "seat_id": "H-67",
                "floor": 3,
                "section": "H",
                "has_power": False,
                "is_window_seat": False,
                "available_slots": ["11:00 AM - 2:00 PM", "2:00 PM - 5:00 PM", "5:00 PM - 8:00 PM"]
            }
        ]
    
    return {
        "total_available": len(available_seats_data),
        "seats_requested": request.seats,
        "power_socket_required": request.power_socket,
        "available_seats": available_seats_data[:min(request.seats * 2, len(available_seats_data))],
        "message": f"Found {len(available_seats_data)} seats matching your requirements"
    }

@router.post("/book-seat")
def book_seat(request: SeatBookingRequest):
    """Book a specific study seat"""
    # Simulate booking storage (in production, save to database)
    booking_id = f"BK{request.seat_id.replace('-', '')}{datetime.now().strftime('%H%M%S')}"
    
    # Reduce available seats
    if library_data["available_seats"] > 0:
        library_data["available_seats"] -= 1
    
    return {
        "status": "success",
        "message": f"Seat {request.seat_id} booked successfully!",
        "booking_id": booking_id,
        "seat_id": request.seat_id,
        "time_slot": request.time_slot,
        "duration": request.duration,
        "floor": request.floor,
        "section": request.section,
        "confirmation": f"Your seat is reserved. Please arrive within 15 minutes of your slot."
    }