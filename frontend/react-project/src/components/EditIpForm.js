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

        try {
            const ipData = {
                ...formData,
                ping_temps_ms: formData.ping_temps_ms ? parseFloat(formData.ping_temps_ms) : null,
                date_de_modification: Date.now() / 1000
            };

            await ipService.updateIp(ip.id, ipData);
            if (onIpUpdated) onIpUpdated();
            if (onClose) onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                                <label htmlFor="ip" className="form-label">Adresse IP *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ip"
                                    name="ip"
                                    value={formData.ip}
                                    onChange={handleChange}
                                    required
                                    pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                                    placeholder="192.168.1.1"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="hostname" className="form-label">Hostname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="hostname"
                                    name="hostname"
                                    value={formData.hostname}
                                    onChange={handleChange}
                                    placeholder="exemple.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="ping_temps_ms" className="form-label">Temps de ping (ms)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ping_temps_ms"
                                    name="ping_temps_ms"
                                    value={formData.ping_temps_ms}
                                    onChange={handleChange}
                                    step="0.1"
                                    min="0"
                                />
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="accessible"
                                    name="accessible"
                                    checked={formData.accessible}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="accessible">Accessible</label>
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