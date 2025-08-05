import React from 'react';

function DeleteConfirmationModal({ ip, onConfirm, onCancel }) {
    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmer la suppression</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer l'adresse IP suivante ?</p>
                        <p className="fw-bold">{ip.ip}</p>
                        {ip.hostname && <p className="text-muted">Hostname: {ip.hostname}</p>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;