from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/sports", tags=["Sports"])


equipment_inventory = {
    "cricket_bat": {
        "total": 10,
        "available": 4
    },
    "cricket_ball": {
        "total": 20,
        "available": 12
    },
    "football": {
        "total": 8,
        "available": 0
    }
}


class EquipmentRequest(BaseModel):
    item: str
    quantity: int



@router.get("/equipment")
def get_equipment_status():
    result = {}
    for item, data in equipment_inventory.items():
        result[item] = {
            "total": data["total"],
            "available": data["available"],
            "status": "Available" if data["available"] > 0 else "Not Available"
        }
    return result



@router.post("/equipment/book")
def book_equipment(req: EquipmentRequest):
    item = req.item.lower()

    if item not in equipment_inventory:
        return {"error": "Equipment not found"}

    if equipment_inventory[item]["available"] >= req.quantity:
        equipment_inventory[item]["available"] -= req.quantity
        return {
            "message": "Equipment booked successfully",
            "item": item,
            "quantity": req.quantity,
            "remaining": equipment_inventory[item]["available"]
        }
    else:
        return {
            "message": "Not enough equipment available",
            "item": item,
            "available": equipment_inventory[item]["available"]
        }
