from contextlib import asynccontextmanager
from fastapi import FastAPI
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
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050)
