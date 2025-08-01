from flask import Blueprint, request, jsonify
from marshmallow import Schema, fields, EXCLUDE
from backend.flask.services.ip_address_service import IPAddressService
from backend.flask.database import get_db


class IPAddressCreateSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    ip = fields.String(required=True)
    accessible = fields.Boolean(required=True)
    hostname = fields.String(allow_none=True)
    ping_temps_ms = fields.Float(allow_none=True)
    date_de_verification = fields.Float(required=True)
    date_de_modification = fields.Float(required=True)


class IPAddressUpdateSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    ip = fields.String()
    accessible = fields.Boolean()
    hostname = fields.String(allow_none=True)
    ping_temps_ms = fields.Float(allow_none=True)
    date_de_verification = fields.Float()
    date_de_modification = fields.Float()


class IPAddressController:
    def __init__(self):
        # Crée un Blueprint Flask pour regrouper toutes les routes liées aux adresses IP
        # avec le préfixe '/v1' pour le versioning de l'API
        self.ip_addresses = Blueprint('ip_addresses', __name__, url_prefix='/v1')

        # Initialise le schéma de validation pour la création d'une adresse IP
        # Ce schéma sera utilisé pour valider les données entrantes lors de la création
        self.create_schema = IPAddressCreateSchema()

        # Initialise le schéma de validation pour la mise à jour d'une adresse IP
        # Ce schéma sera utilisé pour valider les données entrantes lors de la modification
        self.update_schema = IPAddressUpdateSchema()

        # Établit une connexion à la base de données en utilisant un context manager
        # et initialise le service qui gèrera toute la logique métier des adresses IP
        with get_db() as db:
            self.service = IPAddressService(db)

        # Enregistre toutes les routes définies pour ce contrôleur
        # Cette méthode configure les endpoints de l'API
        self._register_routes()

    def _register_routes(self):
        self.ip_addresses.route('/ip', methods=['???'])(self.create_ip_address)
        self.ip_addresses.route('/ip/<string:ip_id>', methods=['???'])(self.get_ip_address)
        self.ip_addresses.route('/ips', methods=['???'])(self.get_all_ip_addresses)
        self.ip_addresses.route('/ip/<string:ip_id>', methods=['???'])(self.update_ip_address)
        self.ip_addresses.route('/ip/<string:ip_id>', methods=['???'])(self.delete_ip_address)

    # Cette fonction est appelée lorsqu'un utilisateur souhaite ajouter une nouvelle adresse IP à surveiller.
    def create_ip_address(self):
        data = self.create_schema.load(request.json)
        ip_address = self.service
        return jsonify(response), 200

    # Récupère les détails d'une adresse IP spécifique à partir de son identifiant.
    # Cette fonction est appelée pour consulter les informations d'une seule adresse IP.
    def get_ip_address(self, ip_id: str):

    # Récupère la liste complète de toutes les adresses IP enregistrées dans le système.
    # Cette fonction est appelée pour obtenir un aperçu global de toutes les IP surveillées.
    def get_all_ip_addresses(self):

    # Modifie les informations d'une adresse IP existante.
    # Cette fonction permet de mettre à jour les données comme l'accessibilité,
    # le temps de ping ou autres attributs d'une IP spécifique.
    def update_ip_address(self, ip_id: str):

    # Supprime une adresse IP du système de surveillance.
    # Cette fonction permet de retirer définitivement une IP de la liste des adresses surveillées.
    def delete_ip_address(self, ip_id: str):


# Create an instance of the controller
ip_address_controller = IPAddressController()
# Export the Blueprint instance
ip_addresses = ip_address_controller.ip_addresses
