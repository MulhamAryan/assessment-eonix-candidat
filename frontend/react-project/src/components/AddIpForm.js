import React, { useState } from 'react';
import { ipService } from '../services/ipService';

function AddIpForm({ onIpAdded }) {
    const [formData, setFormData] = useState({
        ip: '',
        hostname: '',
        accessible: false,
        ping_temps_ms: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
                date_de_verification: Date.now() / 1000,
                date_de_modification: Date.now() / 1000
            };

            await ipService.createIp(ipData);
            setFormData({
                ip: '',
                hostname: '',
                accessible: false,
                ping_temps_ms: ''
            });
            if (onIpAdded) onIpAdded();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Ajouter une adresse IP</h3>
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