
<template>
  <div class="edit-ip">
    <h2>Modifier l'IP</h2>

    <!-- Alert for error messages -->
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ errorMessage }}
      <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-4" v-if="ip">
      <div class="mb-3">
        <label for="ip" class="form-label">Adresse IP</label>
        <input
            type="text"
            class="form-control"
            id="ip"
            v-model="ip.ip"
            required
            pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
            placeholder="192.168.1.1"
        >
      </div>

      <div class="mb-3">
        <label for="hostname" class="form-label">Hostname</label>
        <input
            type="text"
            class="form-control"
            id="hostname"
            v-model="ip.hostname"
            placeholder="exemple.com"
        >
      </div>

      <div class="mb-3">
        <label for="accessible" class="form-label">Statut</label>
        <select class="form-select" id="accessible" v-model="ip.accessible">
          <option :value="true">Accessible</option>
          <option :value="false">Non accessible</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="ping" class="form-label">Ping (ms)</label>
        <input
            type="number"
            class="form-control"
            id="ping"
            v-model="ip.ping_temps_ms"
            placeholder="Temps de réponse en ms"
        >
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
        <router-link to="/ips" class="btn btn-secondary">Annuler</router-link>
      </div>
    </form>

    <!-- Loading spinner -->
    <div v-else class="text-center mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  </div>
</template>

<script>
import IPService from '../services/IPService'

export default {
  name: 'EditIP',
  data() {
    return {
      ip: null,
      errorMessage: ''
    }
  },
  created() {
    this.loadIP();
  },
  methods: {
    async loadIP() {
      // TODO: Implémentation du chargement de l'IP
      // 1. Utiliser IPService avec l'ID de l'IP pour mettre à jours
      // 2. Si succès : assigner la réponse
      // 3. Si erreur : afficher l'erreur dans la console et mettre à jour this.errorMessage
    },
    async handleSubmit() {

    }
  }
}
</script>

<style scoped>
.alert {
  margin-top: 1rem;
}
</style>