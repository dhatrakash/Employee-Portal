# auth_service.py
from fastapi import HTTPException
from repository.user_repository import UserRepository
from services.hash import hash_password, verify_password

class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()

    async def register_user(self, user_data):
        """
        Service logic for registering a new user.
        """
        # Check if the username or email already exists
        existing_user = await self.user_repository.get_user_by_email_or_username(
            email=user_data.email,
            username=user_data.username,
        )
        if existing_user:
            raise HTTPException(status_code=400, detail="Username or email already registered")

        # Hash password and save the user
        hashed_password = hash_password(user_data.password)
        new_user = await self.user_repository.create_user(
            username=user_data.username,
            name=user_data.name,
            email=user_data.email,
            password=hashed_password,
        )

        return {
            "status": "success",
            "message": "User registered successfully",
            "data": {
                "username": new_user.username,
                "name": new_user.name,
                "email": new_user.email,
            },
        }

    async def login_user(self, user_data):
        """
        Service logic for authenticating a user.
        """
        db_user = await self.user_repository.get_user_by_email(user_data.email)
        if not db_user or not verify_password(user_data.password, db_user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "status": "success",
            "message": "Login successful",
            "data": {
                "id": db_user.id,
                "username": db_user.username,
                "name": db_user.name,
                "email": db_user.email,
            },
        }

    async def get_user_profile(self, user_id: int):
        """
        Service logic for fetching a user profile by ID.
        """
        db_user = await self.user_repository.get_user_by_id(user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "status": "success",
            "data": {
                "id": db_user.id,
                "username": db_user.username,
                "name": db_user.name,
                "email": db_user.email,
            },
        }
