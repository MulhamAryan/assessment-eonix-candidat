from flask import Flask
import os
from models.ip_address import IPAddress, Base
from controllers.ip_address_controller import ip_addresses
from database import init_db, get_db, FILE_DB_NAME
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    # Configuration du CORS pour permettre les requêtes cross-origin
    CORS(app,
         resources={r"/*": {
             "origins": "*",
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
             "allow_headers": ["Content-Type", "Authorization"]
         }}
    )

    init_db(app)

    db_path = os.path.abspath(FILE_DB_NAME)
    if os.path.exists(db_path):
        with get_db() as session:
            count = session.query(IPAddress).count()
            if count > 0:
                sample = session.query(IPAddress).limit(3).all()
                print("Échantillon des adresses IP en base :")
                for ip_addr in sample:
                    print(f"  - {ip_addr.ip} | Accessible: {ip_addr.accessible} | Hostname: {ip_addr.hostname}")

    app.register_blueprint(ip_addresses)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5050, debug=True)
