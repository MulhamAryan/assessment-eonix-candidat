from typing import Optional
from sqlalchemy.orm import Session

from backend.flask.repositories.ip_address_repository import IPAddressRepository
from backend.flask.models.ip_address import IPAddress


class IPAddressService:
    def __init__(self, db: Session):
        self.repository = IPAddressRepository(db)

    def create_ip_address(self, ip_data: dict) -> IPAddress:
        if self.repository.exists_by_ip(ip_data.get('ip')):
            raise ValueError(f"IP address {ip_data.get('ip')} already exists")
        return self.repository.create(ip_data)

    def get_ip_address_by_id(self, ip_id: str) -> Optional[IPAddress]:
        return self.repository.get_by_id(ip_id)

    def get_all_ip_addresses(self, skip: int = 0, limit: int = 100) -> list[type[IPAddress]]:
        return self.repository.get_all(skip, limit)

    def update_ip_address(self, ip_id: str, update_data: dict) -> Optional[IPAddress]:
        existing = self.repository.get_by_id(ip_id)
        if not existing:
            raise ValueError(f"IP address with ID {ip_id} not found")

        if 'ip' in update_data and update_data['ip'] != existing.ip:
            if self.repository.exists_by_ip(update_data['ip']):
                raise ValueError(f"IP address {update_data['ip']} already exists")

        return self.repository.update(ip_id, update_data)

    def delete_ip_address(self, ip_id: str) -> bool:
        if not self.repository.get_by_id(ip_id):
            raise ValueError(f"IP address with ID {ip_id} not found")
        return self.repository.delete(ip_id)
