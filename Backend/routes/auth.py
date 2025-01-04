from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from model import user, database
from services.hash import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Register a new user
@router.post("/register")
def register_user(email: str, password: str, db: Session = Depends(database.get_db)):
    # Check if the user exists
    existing_user = db.query(user.User).filter(user.User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password and save the user
    hashed_password = hash_password(password)
    new_user = user.User(email=email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email}

# Login a user
@router.post("/login")
def login_user(email: str, password: str, db: Session = Depends(database.get_db)):
    db_user = db.query(user.User).filter(user.User.email == email).first()
    if not db_user or not verify_password(password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}
