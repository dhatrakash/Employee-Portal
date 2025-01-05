from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# Pydantic models
class UserCreate(BaseModel):
    username: str # Add username
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Initialize the service
auth_service = AuthService()

# Register a new user
@router.post("/register")
async def register_user(user_data: UserCreate):
    """
    Endpoint to register a new user by calling the service layer.
    """
    return await auth_service.register_user(user_data)

# User login
@router.post("/login")
async def login_user(user_data: UserLogin):
    """
    Endpoint to authenticate a user by calling the service layer.
    """
    return await auth_service.login_user(user_data)

# Get user profile
@router.get("/profile")
async def get_user_profile(user_id: int):
    """
    Endpoint to fetch user profile by ID by calling the service layer.
    """
    return await auth_service.get_user_profile(user_id)
