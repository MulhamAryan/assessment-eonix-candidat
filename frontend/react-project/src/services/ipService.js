const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
    throw new Error('La variable d\'environnement REACT_APP_API_URL n\'est pas définie');
}

export const ipService = {
    // Récupérer toutes les IPs
    getAllIps: async () => {
        const response = await fetch(`${API_BASE_URL}/ips`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des IPs');
        return response.json();
    },

    // Récupérer une IP par son ID
    getIpById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/ip/${id}`);
        if (!response.ok) throw new Error('IP non trouvée');
        return response.json();
    },

    // Créer une nouvelle IP
    createIp: async (ipData) => {
        const response = await fetch(`${API_BASE_URL}/ip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ipData),
        });
        if (!response.ok) throw new Error('Erreur lors de la création de l\'IP');
        return response.json();
    },

    // Mettre à jour une IP
    updateIp: async (id, ipData) => {
        const response = await fetch(`${API_BASE_URL}/ip/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ipData),
        });
        if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'IP');
        return response.json();
    },

    // Supprimer une IP
    deleteIp: async (id) => {
        const response = await fetch(`${API_BASE_URL}/ip/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression de l\'IP');
        return response.json();
    },
};