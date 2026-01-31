from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/washroom", tags=["Washroom"])

issues = []

class Issue(BaseModel):
    issue: str
    gender: str

@router.post("/report")
def report_issue(data: Issue):
    entry = {
        "issue": data.issue,
        "gender": data.gender,
        "priority": "HIGH" if data.gender.lower() == "female" else "NORMAL"
    }
    issues.append(entry)
    return entry

@router.get("/all")
def all_issues():
    return issues
