<template>
  <div class="create-ip">
    <h2>Ajouter une nouvelle IP</h2>
    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="mb-3">
        <label for="ip" class="form-label">Adresse IP</label>

      </div>

      <div class="mb-3">
        <label for="hostname" class="form-label">Hostname</label>

      </div>

      <div class="mt-4">
        <router-link to="/ips" class="btn btn-secondary">Annuler</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import IPService from '../services/IPService'

export default {
  name: 'CreateIP',
  data() {
    return {
      ip: {
        id: null,
        ip: '',
        hostname: null,
        accessible: true,
        ping_temps_ms: 123,
        date_de_verification: Date.now(),
        date_de_modification: Date.now()
      },
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      // TODO: Créer une nouvelle IP
      // - Appeler IPService avec this.ip
      // - Si succès : rediriger vers /ips
      // - Si erreur : afficher message d'erreur depuis la réponse
    }
  }
}


</script>