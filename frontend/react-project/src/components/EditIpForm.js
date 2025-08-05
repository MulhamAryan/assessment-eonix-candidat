import React, { useState, useEffect } from 'react';
import { ipService } from '../services/ipService';

function EditIpForm({ ip, onClose, onIpUpdated }) {
    const [formData, setFormData] = useState({
        ip: '',
        hostname: '',
        accessible: false,
        ping_temps_ms: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (ip) {
            setFormData({
                ip: ip.ip || '',
                hostname: ip.hostname || '',
                accessible: ip.accessible || false,
                ping_temps_ms: ip.ping_temps_ms || ''
            });
        }
    }, [ip]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        // Update IP Addresse
        // - Créer un état initial avec les données de l'IP existante
        // - Dans handleSubmit:
        //   - Empêcher soumission par défaut
        //   - Préparer ipData avec:
        //     - Données du formulaire
        //     - Convertir ping_temps_ms en nombre
        //     - Ajouter date_de_modification
        //   - Appeler ipService.updateIp avec id et données
        //   - Si succès: appeler onIpUpdated et fermer modal
        //   - Si erreur: afficher message
        //   - Finalement: désactiver loading
        // - Gérer désactivation du bouton pendant mise à jour

    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modifier l'adresse IP</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
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

                                <label >Accessible</label>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Modification en cours...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditIpForm;