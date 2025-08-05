
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">IP Manager</router-link>
    </div>
  </nav>

  <div class="container mt-4">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>