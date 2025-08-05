<template>
  <div class="container mt-4">
    <h2>Liste des adresses IP</h2>

    <!-- Alert for success/error messages -->
    <div v-if="alert.show" :class="`alert alert-${alert.type} alert-dismissible fade show`" role="alert">
      {{ alert.message }}
      <button type="button" class="btn-close" @click="clearAlert" aria-label="Close"></button>
    </div>

    <router-link to="/ips/create" class="btn btn-primary mb-3">
      Ajouter une IP
    </router-link>

    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Adresse IP</th>
        <th>Statut</th>
        <th>Hostname</th>
        <th>Ping (ms)</th>
        <th>Dernière vérification</th>
        <th>Dernière modification</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <!-- TODO: Ajouter une ligne de tableau pour chaque IP avec :
           - Colonnes : id, ip, statut (avec couleur selon accessible),
           hostname, ping, dates de vérification/modification
           - Boutons d'actions : Éditer (lien) et Supprimer (bouton) -->

      </tbody>
    </table>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="ipToDelete">
            <p>Êtes-vous sûr de vouloir supprimer l'IP "{{ ipToDelete.ip }}" ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="deleteIP">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IPService from '../services/IPService';
import {Modal} from 'bootstrap';

export default {
  name: 'IPList',
  data() {
    return {
      ips: [],
      ipToDelete: null,
      deleteModal: null,
      alert: {
        show: false,
        type: 'success',
        message: ''
      }
    }
  },
  mounted() {
    this.deleteModal = new Modal(this.$refs.deleteModal);
  },
  created() {
    this.loadIPs();
  },
  methods: {
    loadIPs() {
      // TODO: Charger la liste des IPs
      // - Utiliser IPService pour charger toute les resultats
      // - Si succès : mettre à jour this.ips avec response.data
      // - Si erreur : afficher une alerte d'erreur avec showAlert()

    },
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date);
    },
    confirmDelete(ip) {
      this.ipToDelete = ip;
      this.deleteModal.show();
    },
    async deleteIP() {
      // TODO: Supprimer l'IP sélectionnée
      // - Appeler IPService avec l'id de l'ip
      // - Si succès :
      //   * Fermer la modal
      //   * Recharger la liste des IPs
      //   * Afficher message de succès
      // - Si erreur : afficher alerte d'erreur en utilisant  showAlert(type, message)
    },
    showAlert(type, message) {
      this.alert = {
        show: true,
        type: type,
        message: message
      };
      setTimeout(() => this.clearAlert(), 5000);
    },
    clearAlert() {
      this.alert.show = false;
    }
  }
}
</script>

<style scoped>
.table {
  font-size: 0.9rem;
}

.alert {
  margin-bottom: 1rem;
}
</style>