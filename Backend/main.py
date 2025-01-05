from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth
from model.database import init_db
import uvicorn

app = FastAPI(title="Employee Portal Backend")

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

# Initialize the database on startup
@app.on_event("startup")
async def startup_event():
    await init_db()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
