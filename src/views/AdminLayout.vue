<template>
  <div class="layout">
    <Sidebar />
    <main class="layout__main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>
.layout { display: flex; min-height: 100vh; }
.layout__main { flex: 1; min-width: 0; }
</style>
