
# SQL

## Structure de la Base de Données

Notre base de données contient quatre tables principales :
- `equipements` : Stocke les informations sur les équipements réseau
- `metriques` : Enregistre les mesures de performance
- `connexions` : Définit les liens entre les équipements
- `alertes` : Contient les alertes et incidents

## En SQL

1. Lister les Équipements
2. Liste les équipements avec une IP commençant par `192.168.1` et de type `SERVER` ou `FIREWALL`
3. Liste les équipements par ordre alphabétique
   - Affiche les serveurs triés par localisation puis par nom
4. Liste les équipements avec leurs alertes actives
   - Montre les connexions entre équipements avec leurs noms
5. Ajoute un nouveau switch dans le réseau
6. Marque une alerte comme résolue
7. Supprime les métriques plus anciennes que 30 jours
8. Liste les équipements nécessitant une maintenance (>3 alertes critiques)
