from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from backend.fastapi.services.ip_address_service import IPAddressService
from backend.fastapi.database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class IPAddressCreate(BaseModel):
    ip: str
    accessible: bool
    hostname: Optional[str] = None
    ping_temps_ms: Optional[float] = None
    date_de_verification: float
    date_de_modification: float


class IPAddressUpdate(BaseModel):
    ip: Optional[str] = None
    accessible: Optional[bool] = None
    hostname: Optional[str] = None
    ping_temps_ms: Optional[float] = None
    date_de_verification: Optional[float] = None
    date_de_modification: Optional[float] = None


class IPAddressResponse(BaseModel):
    id: str
    ip: str
    accessible: bool
    hostname: Optional[str]
    ping_temps_ms: Optional[float]
    date_de_verification: float
    date_de_modification: float

    class Config:
        from_attributes = True


class IPAddressController:
    def __init__(self):
        self.router = APIRouter(prefix="/v1", tags=["IP Addresses"])
        self._register_routes()

    def _register_routes(self):
        self.router.add_api_route("/ip", self.create_ip_address, methods=["???"], response_model=IPAddressResponse)
        self.router.add_api_route("/ip/{ip_id}", self.get_ip_address, methods=["???"], response_model=IPAddressResponse)
        self.router.add_api_route("/ips", self.get_all_ip_addresses, methods=["???"], response_model=List[IPAddressResponse])
        self.router.add_api_route("/ip/{ip_id}", self.update_ip_address, methods=["???"], response_model=IPAddressResponse)
        self.router.add_api_route("/ip/{ip_id}", self.delete_ip_address, methods=["???"])

    # Cette fonction est appelée lorsqu'un utilisateur souhaite ajouter une nouvelle adresse IP à surveiller.
    async def create_ip_address(
            self,
            ip_data: IPAddressCreate,
            db: Session = Depends(get_db)
    ):
        service = IPAddressService(db)
        service.create_ip_address()

    # Récupère les détails d'une adresse IP spécifique à partir de son identifiant.
    # Cette fonction est appelée pour consulter les informations d'une seule adresse IP.
    async def get_ip_address(
            self,
            ip_id: str,
            db: Session = Depends(get_db)
    ):
        service = IPAddressService(db)


    # Récupère la liste complète de toutes les adresses IP enregistrées dans le système.
    # Cette fonction est appelée pour obtenir un aperçu global de toutes les IP surveillées.
    async def get_all_ip_addresses(
            self,
            db: Session = Depends(get_db)
    ):
        IPAddressService(db)

    # Modifie les informations d'une adresse IP existante.
    # Cette fonction permet de mettre à jour les données comme l'accessibilité,
    # le temps de ping ou autres attributs d'une IP spécifique.
    async def update_ip_address(
            self,
            ip_id: str,
            update_data: IPAddressUpdate,
            db: Session = Depends(get_db)
    ):
        try:
            service = IPAddressService(db)

    # Supprime une adresse IP du système de surveillance.
    # Cette fonction permet de retirer définitivement une IP de la liste des adresses surveillées.
    async def delete_ip_address(
            self,
            ip_id: str,
            db: Session = Depends(get_db)
    ):
        service = IPAddressService(db)

# Create an instance of the controller
ip_address_controller = IPAddressController()
# Export the Blueprint instance
router = ip_address_controller.router