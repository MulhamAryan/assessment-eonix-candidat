from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn
from models.ip_address import IPAddress, Base
from controllers import router
from database import engine, SessionLocal

@asynccontextmanager
async def lifespan():
    Base.metadata.create_all(bind=engine)
    db_path = os.path.abspath("ip_addresses.db")
    if os.path.exists(db_path):
        db = SessionLocal()
        try:
            count = db.query(IPAddress).count()
            if count > 0:
                sample = db.query(IPAddress).limit(3).all()
                for ip_addr in sample:
                    print(f"  - {ip_addr.ip} | Accessible: {ip_addr.accessible} | Hostname: {ip_addr.hostname}")
        finally:
            db.close()
    yield

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050)
