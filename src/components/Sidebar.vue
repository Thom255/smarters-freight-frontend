<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <RouteMark />
    </div>

    <nav class="sidebar__nav">
      <p class="sidebar__label">Operations</p>
      <RouterLink to="/" class="sidebar__link" exact-active-class="is-active">
        <span class="dot"></span> Dashboard
      </RouterLink>
      <RouterLink to="/matches" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Matching Engine
      </RouterLink>
      <RouterLink to="/bookings" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Bookings
      </RouterLink>
      <RouterLink to="/shipments" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Shipments
      </RouterLink>

      <p class="sidebar__label">Fleet &amp; Cargo</p>
      <RouterLink to="/trucks" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Trucks
      </RouterLink>
      <RouterLink to="/drivers" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Drivers
      </RouterLink>
      <RouterLink to="/cargo" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Cargo
      </RouterLink>

      <p class="sidebar__label">Platform</p>
      <RouterLink to="/users" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Users
      </RouterLink>
      <RouterLink to="/commissions" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Commissions
      </RouterLink>
      <RouterLink to="/reports" class="sidebar__link" active-class="is-active">
        <span class="dot"></span> Reports
      </RouterLink>
    </nav>

    <button class="sidebar__logout btn btn--ghost" @click="onLogout">Sign out</button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import RouteMark from './RouteMark.vue'

const router = useRouter()
const auth = useAuthStore()

function onLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  height: 100vh;
  position: sticky;
  top: 0;
  background: var(--ink-900);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
}
.sidebar__brand { padding: 0 8px 22px; }
.sidebar__nav { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
.sidebar__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--paper-faint);
  margin: 16px 10px 6px;
}
.sidebar__label:first-child { margin-top: 0; }
.sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--paper-dim);
}
.sidebar__link:hover { background: var(--ink-800); color: var(--paper); }
.sidebar__link.is-active { background: var(--ink-800); color: var(--paper); }
.sidebar__link.is-active .dot { background: var(--amber); }
.dot { width: 5px; height: 5px; border-radius: 50%; background: var(--paper-faint); }
.sidebar__logout { margin-top: 12px; width: 100%; }
</style>
