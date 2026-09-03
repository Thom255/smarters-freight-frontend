<template>
  <div class="stat card">
    <p class="stat__label">{{ label }}</p>
    <p class="stat__value mono">{{ value }}</p>
    <p class="stat__delta" v-if="delta" :class="deltaClass">{{ delta }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: String,
  value: [String, Number],
  delta: String,
  trend: { type: String, default: 'up' } // 'up' | 'down'
})
const deltaClass = computed(() => (props.trend === 'down' ? 'is-down' : 'is-up'))
</script>

<style scoped>
.stat { padding: 18px 20px; }
.stat__label {
  margin: 0 0 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper-faint);
}
.stat__value { margin: 0; font-size: 26px; font-weight: 600; }
.stat__delta { margin: 8px 0 0; font-size: 12.5px; }
.stat__delta.is-up { color: var(--signal); }
.stat__delta.is-down { color: var(--warn); }
</style>
