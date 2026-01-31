from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/sports", tags=["Sports"])


equipment_inventory = {
    "cricket": {
        "total": 15,
        "available": 8,
        "display_name": "Cricket Kit"
    },
    "football": {
        "total": 8,
        "available": 0,
        "display_name": "Football"
    },
    "badminton": {
        "total": 12,
        "available": 7,
        "display_name": "Badminton Racket"
    },
    "table_tennis": {
        "total": 10,
        "available": 5,
        "display_name": "Table Tennis Paddle"
    },
    "basketball": {
        "total": 10,
        "available": 6,
        "display_name": "Basketball"
    },
    "volleyball": {
        "total": 6,
        "available": 0,
        "display_name": "Volleyball"
    }
}


class EquipmentRequest(BaseModel):
    item: str
    quantity: int


class EquipmentBookingRequest(BaseModel):
    item: str
    quantity: int
    time_slot: str


class SlotBookingRequest(BaseModel):
    court: str
    sport: str
    time_slot: str
    date: str


# Sports slots storage
sports_slots = {
    "basketball_court_1": {
        "Monday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Tuesday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Wednesday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Thursday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Friday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Saturday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
        "Sunday": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
    }
}

user_bookings = {}



@router.get("/equipment")
def get_equipment_status():
    result = {}
    for item, data in equipment_inventory.items():
        result[item] = {
            "total": data["total"],
            "available": data["available"],
            "display_name": data["display_name"],
            "status": "Available" if data["available"] > 0 else "Not Available"
        }
    return result


@router.get("/equipment/time-slots")
def get_equipment_time_slots():
    """Get available time slots for equipment booking"""
    return {
        "available_slots": [
            "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", 
            "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
            "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
        ]
    }


@router.post("/equipment/book")
def book_equipment(req: EquipmentBookingRequest):
    item = req.item.lower()

    if item not in equipment_inventory:
        return {"error": "Equipment not found"}

    if equipment_inventory[item]["available"] >= req.quantity:
        equipment_inventory[item]["available"] -= req.quantity
        return {
            "status": "success",
            "message": "Equipment booked successfully",
            "item": item,
            "display_name": equipment_inventory[item]["display_name"],
            "quantity": req.quantity,
            "time_slot": req.time_slot,
            "remaining": equipment_inventory[item]["available"]
        }
    else:
        return {
            "status": "error",
            "message": "Not enough equipment available",
            "item": item,
            "available": equipment_inventory[item]["available"]
        }

@router.get("/slots")
def get_available_slots(court: str = "basketball_court_1", day: str = "Monday"):
    """Get available slots for a specific court and day"""
    if court not in sports_slots:
        return {"error": "Court not found"}
    
    if day not in sports_slots[court]:
        return {"error": "Invalid day"}
    
    available_slots = sports_slots[court][day]
    booked_count = len([b for b in user_bookings.values() if b.get("court") == court and b.get("day") == day])
    
    return {
        "court": court,
        "day": day,
        "available_slots": available_slots,
        "total_slots": len(available_slots),
        "booked_count": booked_count,
        "free_slots": len(available_slots) - booked_count
    }


@router.post("/slots/book")
def book_slot(req: SlotBookingRequest):
    """Book a sports slot"""
    user_id = "user_123"  # In production, get from auth
    
    if req.court not in sports_slots:
        return {"error": "Court not found"}
    
    if req.date not in sports_slots[req.court]:
        return {"error": "Invalid date"}
    
    if req.time_slot not in sports_slots[req.court][req.date]:
        return {"error": "Invalid time slot"}
    
    booking_key = f"{req.court}_{req.date}_{req.time_slot}"
    
    # Check if already booked
    if booking_key in user_bookings:
        return {"error": "Slot already booked"}
    
    # Book the slot
    user_bookings[booking_key] = {
        "user_id": user_id,
        "court": req.court,
        "sport": req.sport,
        "date": req.date,
        "time_slot": req.time_slot,
        "status": "Confirmed"
    }
    
    return {
        "message": "Slot booked successfully",
        "booking": user_bookings[booking_key]
    }


@router.get("/my-bookings")
def get_user_bookings():
    """Get user's bookings"""
    user_id = "user_123"  # In production, get from auth
    user_bookings_list = [b for b in user_bookings.values() if b.get("user_id") == user_id]
    
    return {
        "user_id": user_id,
        "total_bookings": len(user_bookings_list),
        "bookings": user_bookings_list
    }