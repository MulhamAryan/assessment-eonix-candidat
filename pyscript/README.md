**Problématique actuelle**

Notre équipe infrastructure passe actuellement 2 à 3 heures par semaine à vérifier manuellement l'état de nos
équipements réseau (connectivité, accessibilité, disponibilité).

Cette tâche, bien qu'essentielle, présente plusieurs limitations :

- Elle est répétitive et mobilise du temps sur des actions à faible valeur ajoutée.
- Elle est non centralisée : chaque membre peut effectuer la vérification différemment, ce qui rend difficile la
  traçabilité des actions menées.
- Il n'existe aucun historique structuré des résultats de ces vérifications (adresses IP atteignables, noms d’hôtes,
  temps de réponse, etc.), ce qui complique les analyses à posteriori.
- En cas d'anomalie (ex : déconnexion temporaire), aucune alerte ou log clair n’est généré, ce qui peut retarder la
  détection de certains incidents.

**Objectif souhaité**

Nous souhaitons mettre en place un outil simple qui permette de :

- Automatiser la vérification régulière de l’accessibilité des adresses IP de notre parc réseau.
- Centraliser les résultats dans un fichier consultable par toute l’équipe.
- Générer une vue synthétique de l’état du réseau à un instant T, incluant des informations utiles telles que la
  disponibilité, un identifiant clair (nom d’hôte si disponible), et un horodatage.
- Réduire la dépendance aux vérifications manuelles et améliorer la traçabilité des anomalies réseau.

**Objectif général de cet exercice**

- Modifier le script `ip_scanner.py` pour automatiser la lecture des adresses IP à partir d'un fichier JSON
  `ip_addresses.json`.
- Le script devra analyser chaque IP et produire un rapport structuré, tout en restant clair, maintenable et facilement
  exécutable.
- `check_ip(ip)` Vérifie la connectivité d'une IP : ping, résolution DNS inverse, temps de réponse, horodatage.
- `read_single_ip(ip_data)` Gère le traitement d'une entrée IP (sous forme de dictionnaire), en appelant check_ip et en
  capturant les erreurs éventuelles.
- `read_ip_addresses_from_file(input_file)` Lit un fichier JSON contenant une liste d’adresses IP, les traite en
  parallèle, puis retourne les résultats triés.
- `write_results(results, output_file)` Sauvegarde les résultats de la vérification IP dans un fichier JSON formaté (
  lisible et structuré).
- `main()` Fonction principale qui orchestre la lecture des IP, le traitement et l’écriture du fichier de sortie.

**Structure des json**

- Liste des addresses
    - (voir fichier `ip_addresses.json`)
- Structure réponse (à stocker dans le fichier `ip_results_output.json`)
    - en cas de réponse avec succès l'objet de la réponse :
      `{"ip": "192.203.230.10", "accessible": true, "hostname": "e.root-servers.net", "ping_temps_ms": 6.09, "date_de_verification": "1753908732"}`
    - en cas de réponse avec échec l'objet de la réponse :
      `{"ip": "192.203.230.10", "accessible": false, "hostname": null, "ping_temps_ms": null, "date_de_verification": "1753908740"}`
    - `accessible`: Vérifie si le ping a réussi ou non (renvoie True ou False).
    - `hostname`: Stocke le nom d’hôte (hostname) de l’adresse IP.
    - `ping_temps_ms`: temps de réponse ping millisecondes (ms)
    - `date_de_verification`: correspond à la date et l’heure précises auxquelles une action de vérification a été
      effectuée.