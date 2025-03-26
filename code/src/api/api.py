import asyncio
from fastapi import FastAPI
from chat_api import ChatAPI  # Import your class
from dotenv import load_dotenv  # Import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

load_dotenv()
app = FastAPI()

# Enable CORS so that your frontend can call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MCP_SERVER_PATH = os.getenv("MCP_SERVER_PATH")

@app.on_event("startup")
async def on_startup():
    # Instantiate the class
    print('on startup')

    
    my_api = ChatAPI()
    # Include the router
    app.include_router(my_api.router, prefix="/api", tags=["ChatAPI"])

    try:
        await my_api.initialize_with_mcp(MCP_SERVER_PATH)
    except Exception as e:
        print(f"Error connecting to server: {e}")


