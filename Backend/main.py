from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth
from model import database

app = FastAPI(title="Employee Portal Backend")

# Initialize the database tables
database.Base.metadata.create_all(bind=database.engine)

# Include authentication routes
app.include_router(auth.router)

# Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Employee Portal API"}
