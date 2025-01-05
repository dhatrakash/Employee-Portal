from model.database import get_session
from sqlalchemy.future import select
from model.user import User

class UserRepository:
    async def get_user_by_email_or_username(self, email: str, username: str):
        """
        Retrieve a user by email or username.
        """
        async with get_session() as session:
            result = await session.execute(
                select(User).filter((User.email == email) | (User.username == username))
            )
            return result.scalars().first()

    async def get_user_by_email(self, email: str):
        """
        Retrieve a user by email.
        """
        async with get_session() as session:
            result = await session.execute(
                select(User).filter(User.email == email)
            )
            return result.scalars().first()

    async def get_user_by_id(self, user_id: int):
        """
        Retrieve a user by ID.
        """
        async with get_session() as session:
            result = await session.execute(
                select(User).filter(User.id == user_id)
            )
            return result.scalars().first()

    async def create_user(self, username: str, name: str, email: str, password: str):
        """
        Create and save a new user in the database.
        """
        async with get_session() as session:
            new_user = User(
                username=username,
                name=name,
                email=email,
                password=password,
            )
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user
