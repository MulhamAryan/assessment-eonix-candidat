import React, { useState, useEffect } from 'react';
import { ipService } from '../services/ipService';
import AddIpForm from './AddIpForm';
import EditIpForm from './EditIpForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function IpList() {
    const [ips, setIps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingIp, setEditingIp] = useState(null);
    const [deletingIp, setDeletingIp] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const loadIps = async () => {
        try {
            const data = await ipService.getAllIps();
            setIps(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            try {
                await loadIps();
            } catch (error) {
                console.error('Error loading IPs:', error);
            }
        };

        void load();
    }, []);


    const handleAddClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleEditClick = (ip) => {
        setEditingIp(ip);
    };

    const handleDeleteClick = (ip) => {
        setDeletingIp(ip);
        setDeleteError(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            await ipService.deleteIp(deletingIp.id);
            await loadIps();
            setDeletingIp(null);
        } catch (err) {
            setDeleteError(err.message);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            {deleteError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {deleteError}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setDeleteError(null)}
                    ></button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Liste des adresses IP</h2>
                <button
                    className="btn btn-primary"
                    onClick={handleAddClick}
                >
                    {showAddForm ? 'Masquer le formulaire' : 'Ajouter une IP'}
                </button>
            </div>

            {showAddForm && (
                <AddIpForm
                    onIpAdded={() => {
                        loadIps();
                        setShowAddForm(false);
                    }}
                />
            )}

            {editingIp && (
                <EditIpForm
                    ip={editingIp}
                    onClose={() => setEditingIp(null)}
                    onIpUpdated={loadIps}
                />
            )}

            {deletingIp && (
                <DeleteConfirmationModal
                    ip={deletingIp}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingIp(null)}
                />
            )}

            <div className="table-responsive mt-4">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>IP</th>
                        <th>Hostname</th>
                        <th>Accessible</th>
                        <th>Ping (ms)</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ips.map((ip) => (
                        <tr key={ip.id}>
                            <td>{ip.ip}</td>
                            <td>{ip.hostname || '-'}</td>
                            <td>
                                    <span className={`badge ${ip.accessible ? 'bg-success' : 'bg-danger'}`}>
                                        {ip.accessible ? 'Oui' : 'Non'}
                                    </span>
                            </td>
                            <td>{ip.ping_temps_ms || '-'}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => handleEditClick(ip)}
                                >
                                    Éditer
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteClick(ip)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IpList;