<template>
  <div class="login">
    <div class="login__panel card">
      <RouteMark />
      <h1 class="login__title">Admin sign in</h1>
      <p class="login__sub">Dispatch, fleet and marketplace control.</p>

      <form @submit.prevent="onSubmit" class="login__form">
        <label class="field">
          <span>Email</span>
          <input v-model="email" type="email" placeholder="admin@smartersfreight.co.tz" required />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </label>
        <p class="login__error" v-if="error">{{ error }}</p>
        <button class="btn btn--primary" type="submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import RouteMark from '../components/RouteMark.vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function onSubmit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push(route.query.redirect || '/')
  } catch (e) {
    error.value = e.response?.data?.message || 'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(600px 300px at 20% 0%, rgba(255,176,32,0.06), transparent),
    var(--ink-950);
}
.login__panel { width: 380px; padding: 32px; }
.login__title { font-family: var(--font-display); font-size: 21px; margin: 22px 0 4px; }
.login__sub { color: var(--paper-faint); font-size: 13px; margin: 0 0 22px; }
.login__form { display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--paper-dim); }
.login__error { color: var(--warn); font-size: 12.5px; margin: -4px 0 0; }
.btn { margin-top: 4px; }
</style>
