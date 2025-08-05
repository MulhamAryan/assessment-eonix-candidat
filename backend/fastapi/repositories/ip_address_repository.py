from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional, Any
from ..models.ip_address import IPAddress


class IPAddressRepository:

    def __init__(self, db: Session):
        self.db = db

    # Crée une nouvelle adresse IP dans la base de données
    # Retourne l'objet IPAddress créé ou lève une exception en cas d'erreur
    # @param ip_data: dictionnaire contenant les données de l'adresse IP
    # @return: l'objet IPAddress créé
    # @raise: SQLAlchemyError en cas d'erreur
    def create(self, ip_data: dict) -> IPAddress:
        try:
            ip_address = IPAddress(**ip_data)
            self.db.add(ip_address)
            self.db.commit()
            self.db.refresh(ip_address)
            return ip_address
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e

    # Récupère une adresse IP par son identifiant
    # Retourne l'objet IPAddress ou None si non trouvé
    # @param ip_id: l'identifiant de l'adresse IP à rechercher
    # @return: l'objet IPAddress si trouvé, None sinon
    def get_by_id(self, ip_id: str) -> Optional[IPAddress]:
        return self.db.query(IPAddress)  # continue

    # Récupère toutes les adresses IP avec pagination
    # skip: nombre d'entrées à sauter, limit: nombre maximum d'entrées à retourner
    # @param skip: nombre d'entrées à sauter pour la pagination
    # @param limit: nombre maximum d'entrées à retourner
    # @return: liste des adresses IP correspondant aux critères
    def get_all(self, skip: int = 0, limit: int = 100) -> list[type[IPAddress]]:

    # Met à jour une adresse IP existante avec les nouvelles données
    # Retourne l'objet IPAddress mis à jour ou None si non trouvé
    # @param ip_id: identifiant de l'IP à modifier
    # @param ip_data: nouvelles données à appliquer
    # @return: l'objet IPAddress mis à jour ou None si non trouvé
    # @raise: SQLAlchemyError en cas d'erreur
    def update(self, ip_id: str, ip_data: dict) -> Optional[IPAddress]:

    # Supprime une adresse IP de la base de données
    # Retourne True si supprimé avec succès, False sinon
    # @param ip_id: identifiant de l'IP à supprimer
    # @return: True si supprimé avec succès, False si l'IP n'existe pas
    # @raise: SQLAlchemyError en cas d'erreur lors de la suppression
    def delete(self, ip_id: str) -> bool:
        try:
            ip_address = self.get_by_id(ip_id)
            if ip_address:
                self.db.delete(ip_address)
                self.db.commit()
                return True
            return False
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e

    # Compte le nombre total d'adresses IP dans la base de données
    # @return: nombre total d'adresses IP enregistrées
    def count(self) -> int:

    # Vérifie si une adresse IP existe déjà dans la base de données
    # Retourne True si l'IP existe, False sinon
    # @param ip: adresse IP à vérifier
    # @return: True si l'IP existe déjà, False sinon
    def exists_by_ip(self, ip: str) -> bool:
