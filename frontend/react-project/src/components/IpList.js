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
        // Utilise le service ipService pour charger les IPs Addresse
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
        // Utilise le service ipService pour supprimer une addresse IP

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
                // - Utilise <AddIpForm> avec props:
                //   - onIpAdded: callback qui:
                //     - Recharge la liste des IPs (loadIps)
                //     - Cache le formulaire (setShowAddForm(false))
                // - Le formulaire doit être affiché uniquement si showAddForm est true
                // - Ajouter bouton pour basculer l'affichage du formulaire

            )}

            {editingIp && (
                // - Utilise <EditIpForm> avec props:
                //   - ip: passer l'IP en cours d'édition (editingIp)
                //   - onClose: callback pour fermer le modal (setEditingIp(null))
                //   - onIpUpdated: callback pour recharger la liste (loadIps)
                // - Le formulaire apparaît si editingIp n'est pas null
                // - Gérer le clic sur "Éditer" pour définir editingIp

            )}

            {deletingIp && (
                // - utilise <DeleteConfirmationModal> avec props:
                //   - ip: IP à supprimer (deletingIp)
                //   - onConfirm: callback de confirmation (handleDeleteConfirm) qui:
                //     - Appelle ipService.deleteIp
                //     - Recharge la liste
                //     - Réinitialise deletingIp
                //   - onCancel: callback pour annuler (setDeletingIp(null))
                // - Modal visible uniquement si deletingIp n'est pas null
                // - Gérer les erreurs de suppression avec deleteError

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
                    <!-- Lister les addresses charger dans le tableau-->
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IpList;