import React, {useState} from 'react';
import {ipService} from '../services/ipService';

function AddIpForm({onIpAdded}) {
    const [formData, setFormData] = useState({
        ip: '',
        hostname: '',
        accessible: false,
        ping_temps_ms: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        //Creation d'une address ip
        // - Créer états avec useState pour: formData (ip, hostname, accessible, ping_temps_ms), error, loading
        // - Implémenter handleChange pour gérer les modifications des champs
        // - Dans handleSubmit:
        //   - Prévenir le comportement par défaut du formulaire
        //   - Valider format IP et ping > 0
        //   - Appeler ipService.createIp avec les données
        //   - Si succès: reset form et notifier parent
        //   - Si erreur: afficher message erreur
        // - Ajouter validation et messages d'erreur pour chaque champ
        // - Gérer désactivation bouton pendant chargement

    };

    return (
        <div className="container mt-4">
            <h3>Ajouter une adresse IP</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Adresse IP *</label>

                </div>

                <div className="mb-3">
                    <label>Hostname</label>

                </div>

                <div className="mb-3">
                    <label>Temps de ping (ms)</label>

                </div>

                <div className="mb-3 form-check">

                    <label>Accessible</label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Ajout en cours...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}

export default AddIpForm;