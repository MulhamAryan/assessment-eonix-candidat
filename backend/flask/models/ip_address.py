from sqlalchemy import Column, String, Boolean, Float, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.sqlite import TEXT
import uuid

Base = declarative_base()

class IPAddress(Base):
    __tablename__ = "ip_addresses"

    id = Column(TEXT, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    ip = Column(String(45), nullable=False, index=True)
    accessible = Column(Boolean, nullable=False, default=False)
    hostname = Column(String(255), nullable=True)
    ping_temps_ms = Column(Float, nullable=True)
    date_de_verification = Column(Float, nullable=False)
    date_de_modification = Column(Float, nullable=False)

    def __repr__(self):
        return f"<IPAddress(id={self.id}, ip={self.ip}, accessible={self.accessible})>"

    def to_dict(self):
        return {
            "id": self.id,
            "ip": self.ip,
            "accessible": self.accessible,
            "hostname": self.hostname,
            "ping_temps_ms": self.ping_temps_ms,
            "date_de_verification": self.date_de_verification,
            "date_de_modification": self.date_de_modification
        }