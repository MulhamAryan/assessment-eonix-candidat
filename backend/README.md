### Exercice : Gestionnaire d'adresses IP avec flask ou fastapi**
### Objectif
Créer une API REST pour gérer une liste d'adresses IP avec leurs caractéristiques, en utilisant une architecture en couches (Repository Pattern).

### Contexte
Vous devez développer une application permettant de gérer des adresses IP et leurs informations associées (accessibilité, hostname, temps de ping, etc.). L'application doit suivre une architecture en couches bien définie pour assurer la maintenabilité et la séparation des responsabilités.

### Spécifications techniques
**Structure de données**

Chaque adresse IP doit contenir les informations suivantes :
- IP (string, obligatoire)
- Accessible (boolean, obligatoire)
- Hostname (string, optionnel)
- Temps de ping en ms (float, optionnel)
- Date de vérification (float, timestamp, obligatoire)
- Date de modification (float, timestamp, obligatoire)

### Architecture en couches
L'application doit être structurée selon les 3 couches suivantes :
1. **Controller (Présentation)**
    - Gestion des routes HTTP
    - Validation des entrées avec Marshmallow
    - Gestion des réponses HTTP et des erreurs
    - Point d'entrée de l'API

2. **Service (Logique métier)**
    - Implémentation de la logique métier
    - Orchestration des opérations
    - Validation des règles métier

3. **Repository (Accès aux données)**
    - Interaction avec la base de données
    - Opérations CRUD basiques
    - Abstraction de la couche de persistance

### API endpoints à implémenter
Créer les endpoints suivants : (Vous pouvez importer `postman.json` pour tester les endpoints)
1. `/v1/ip` : Création d'une nouvelle adresse IP
2. `/v1/ip/<ip_id>` : Récupération d'une adresse IP par son ID
3. `/v1/ips` : Liste de toutes les adresses IP
4. `/v1/ip/<ip_id>` : Mise à jour d'une adresse IP
5. `/v1/ip/<ip_id>` : Suppression d'une adresse IP

## Critères d'évaluation

1. Respect de l'architecture en couches
2. Qualité du code et bonnes pratiques

