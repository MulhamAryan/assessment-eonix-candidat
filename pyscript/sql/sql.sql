-- Création de la table des équipements réseau
CREATE TABLE equipements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(100) NOT NULL,
    ip_address VARCHAR(15) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('ROUTER', 'SWITCH', 'FIREWALL', 'SERVER', 'ENDPOINT')),
    localisation VARCHAR(100),
    fabricant VARCHAR(100),
    modele VARCHAR(100),
    date_installation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dernier_status VARCHAR(20) DEFAULT 'ACTIVE',
    CONSTRAINT valid_ip CHECK (ip_address GLOB '[0-9]*.[0-9]*.[0-9]*.[0-9]*')
);

-- Création de la table des métriques de performance
CREATE TABLE metriques (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipement_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cpu_usage FLOAT,
    memoire_usage FLOAT,
    latence FLOAT,
    paquets_perdus INTEGER,
    bande_passante_mbps FLOAT,
    FOREIGN KEY (equipement_id) REFERENCES equipements(id)
);

-- Création de la table des connexions entre équipements
CREATE TABLE connexions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER,
    destination_id INTEGER,
    type_connexion VARCHAR(50) CHECK (type_connexion IN ('ETHERNET', 'FIBER', 'WIFI', 'VPN')),
    vitesse_mbps INTEGER,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES equipements(id),
    FOREIGN KEY (destination_id) REFERENCES equipements(id)
);

-- Création de la table des alertes
CREATE TABLE alertes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipement_id INTEGER,
    type_alerte VARCHAR(50) NOT NULL,
    severite VARCHAR(20) CHECK (severite IN ('INFO', 'WARNING', 'CRITICAL')),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolu BOOLEAN DEFAULT 0,
    date_resolution TIMESTAMP,
    FOREIGN KEY (equipement_id) REFERENCES equipements(id)
);

-- Création d'index pour optimiser les performances
CREATE INDEX idx_equipements_ip ON equipements(ip_address);
CREATE INDEX idx_metriques_timestamp ON metriques(timestamp);
CREATE INDEX idx_metriques_equipement ON metriques(equipement_id);
CREATE INDEX idx_alertes_equipement ON alertes(equipement_id);
CREATE INDEX idx_alertes_severite ON alertes(severite);


-- Insertion d'équipements réseau
INSERT INTO equipements (nom, ip_address, type, localisation, fabricant, modele) VALUES
-- Routeurs
('Router-Core-01', '192.168.1.1', 'ROUTER', 'Datacenter Nord', 'Cisco', 'ASR-9000'),
('Router-Edge-01', '192.168.1.2', 'ROUTER', 'Datacenter Nord', 'Juniper', 'MX480'),
('Router-Branch-01', '192.168.2.1', 'ROUTER', 'Bureau Paris', 'Cisco', 'ISR4451'),
('Router-Branch-02', '192.168.3.1', 'ROUTER', 'Bureau Lyon', 'Cisco', 'ISR4321'),

-- Switches
('Switch-Core-01', '192.168.1.10', 'SWITCH', 'Datacenter Nord', 'Cisco', 'Nexus 9396'),
('Switch-Core-02', '192.168.1.11', 'SWITCH', 'Datacenter Nord', 'Cisco', 'Nexus 9396'),
('Switch-Access-01', '192.168.2.10', 'SWITCH', 'Bureau Paris', 'HP', 'Aruba 2930F'),
('Switch-Access-02', '192.168.3.10', 'SWITCH', 'Bureau Lyon', 'HP', 'Aruba 2930F'),

-- Firewalls
('FW-Primary', '192.168.1.20', 'FIREWALL', 'Datacenter Nord', 'Palo Alto', 'PA-5260'),
('FW-Secondary', '192.168.1.21', 'FIREWALL', 'Datacenter Nord', 'Palo Alto', 'PA-5260'),
('FW-Branch-Paris', '192.168.2.20', 'FIREWALL', 'Bureau Paris', 'Fortinet', 'FG-100F'),
('FW-Branch-Lyon', '192.168.3.20', 'FIREWALL', 'Bureau Lyon', 'Fortinet', 'FG-100F'),

-- Serveurs
('Web-Server-01', '192.168.1.100', 'SERVER', 'Datacenter Nord', 'Dell', 'PowerEdge R740'),
('Web-Server-02', '192.168.1.101', 'SERVER', 'Datacenter Nord', 'Dell', 'PowerEdge R740'),
('DB-Server-01', '192.168.1.110', 'SERVER', 'Datacenter Nord', 'HP', 'ProLiant DL380'),
('DB-Server-02', '192.168.1.111', 'SERVER', 'Datacenter Nord', 'HP', 'ProLiant DL380');

-- Insertion de connexions entre équipements
INSERT INTO connexions (source_id, destination_id, type_connexion, vitesse_mbps) VALUES
-- Connexions Core
(1, 5, 'FIBER', 100000),
(1, 6, 'FIBER', 100000),
(2, 5, 'FIBER', 100000),
(2, 6, 'FIBER', 100000),
-- Connexions Firewall
(9, 5, 'FIBER', 40000),
(9, 6, 'FIBER', 40000),
(10, 5, 'FIBER', 40000),
(10, 6, 'FIBER', 40000),
-- Connexions Branch
(3, 7, 'ETHERNET', 10000),
(4, 8, 'ETHERNET', 10000),
-- Connexions Serveurs
(5, 13, 'ETHERNET', 10000),
(5, 14, 'ETHERNET', 10000),
(6, 15, 'ETHERNET', 10000),
(6, 16, 'ETHERNET', 10000);

-- Insertion de métriques (dernières 24h, une mesure toutes les heures)
WITH RECURSIVE
    timestamps(ts) AS (
        SELECT datetime('now', '-24 hours')
        UNION ALL
        SELECT datetime(ts, '+1 hour')
        FROM timestamps
        WHERE ts < datetime('now')
    )
INSERT INTO metriques (equipement_id, timestamp, cpu_usage, memoire_usage, latence, paquets_perdus, bande_passante_mbps)
SELECT
    e.id,
    ts,
    -- CPU usage variable selon le type d'équipement
    CASE e.type
        WHEN 'ROUTER' THEN ABS(random() % 40) + 30
        WHEN 'FIREWALL' THEN ABS(random() % 50) + 20
        WHEN 'SWITCH' THEN ABS(random() % 30) + 10
        WHEN 'SERVER' THEN ABS(random() % 70) + 20
    END,
    -- Mémoire usage
    ABS(random() % 40) + 40,
    -- Latence
    CASE e.type
        WHEN 'ROUTER' THEN (random() % 5) + 1
        WHEN 'FIREWALL' THEN (random() % 3) + 1
        WHEN 'SWITCH' THEN (random() % 2) + 0.5
        WHEN 'SERVER' THEN (random() % 4) + 2
    END,
    -- Paquets perdus
    ABS(random() % 100),
    -- Bande passante
    CASE e.type
        WHEN 'ROUTER' THEN ABS(random() % 8000) + 2000
        WHEN 'FIREWALL' THEN ABS(random() % 5000) + 1000
        WHEN 'SWITCH' THEN ABS(random() % 6000) + 3000
        WHEN 'SERVER' THEN ABS(random() % 3000) + 1000
    END
FROM equipements e
CROSS JOIN timestamps;

-- Insertion d'alertes
INSERT INTO alertes (equipement_id, type_alerte, severite, message, timestamp, resolu) VALUES
-- Alertes critiques
(1, 'CPU_HIGH', 'CRITICAL', 'CPU Usage above 90% for more than 5 minutes', datetime('now', '-12 hours'), 1),
(9, 'MEMORY_HIGH', 'CRITICAL', 'Memory usage reached 95%', datetime('now', '-8 hours'), 1),
(13, 'DISK_FULL', 'CRITICAL', 'Root partition usage above 95%', datetime('now', '-4 hours'), 0),

-- Alertes warning
(5, 'HIGH_LATENCY', 'WARNING', 'Network latency above threshold (5ms)', datetime('now', '-6 hours'), 1),
(2, 'BANDWIDTH_HIGH', 'WARNING', 'Bandwidth utilization above 80%', datetime('now', '-3 hours'), 0),
(15, 'DB_SLOW', 'WARNING', 'Database response time degraded', datetime('now', '-2 hours'), 0),

-- Alertes info
(7, 'LINK_FLAPPING', 'INFO', 'Interface GigabitEthernet1/0/1 flapping', datetime('now', '-5 hours'), 1),
(10, 'CONFIG_CHANGE', 'INFO', 'Configuration changed by admin', datetime('now', '-1 hour'), 1),
(14, 'SERVICE_RESTART', 'INFO', 'Web service automatically restarted', datetime('now', '-30 minutes'), 1);