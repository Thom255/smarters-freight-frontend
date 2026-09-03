<template>
  <header class="topbar">
    <div>
      <h1 class="topbar__title">{{ title }}</h1>
      <p class="topbar__sub" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="topbar__right">
      <!-- Kitufe cha Kubadilisha Theme -->
      <button class="topbar__theme-btn" @click="toggleTheme" title="Badilisha Theme">
        <span>{{ currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark' }}</span>
      </button>

      <div class="topbar__user">
        <div class="topbar__avatar">{{ initials }}</div>
        <div class="topbar__userinfo">
          <span class="topbar__name">{{ auth.user?.full_name || 'Admin' }}</span>
          <span class="topbar__role mono">{{ auth.user?.role || 'ADMIN' }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTheme } from '../composables/useTheme'

const props = defineProps({ title: String, subtitle: String })
const auth = useAuthStore()
const { currentTheme, toggleTheme } = useTheme()

const initials = computed(() => (auth.user?.full_name || 'A D')
  .split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase())
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid var(--line);
}
.topbar__title { font-family: var(--font-display); font-size: 20px; margin: 0; }
.topbar__sub { margin: 4px 0 0; color: var(--paper-faint); font-size: 13px; }
.topbar__right { display: flex; align-items: center; gap: 16px; }

/* Styles za Kitufe cha Theme */
.topbar__theme-btn {
  background: var(--ink-700);
  border: 1px solid var(--line);
  color: var(--paper);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.topbar__theme-btn:hover {
  border-color: var(--paper-faint);
  background: var(--ink-600);
}

.topbar__user { display: flex; align-items: center; gap: 10px; }
.topbar__avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--amber-dim); color: var(--amber);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 12px; font-weight: 600;
}
.topbar__userinfo { display: flex; flex-direction: column; line-height: 1.2; }
.topbar__name { font-size: 13.5px; font-weight: 600; }
.topbar__role { font-size: 10.5px; color: var(--paper-faint); letter-spacing: 0.06em; }
</style>