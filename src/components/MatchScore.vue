<template>
  <div class="match-score">
    <svg viewBox="0 0 40 40" class="match-score__ring">
      <circle cx="20" cy="20" r="16" class="match-score__track" />
      <circle cx="20" cy="20" r="16" class="match-score__fill" :style="fillStyle" />
    </svg>
    <div class="match-score__label">
      <span class="mono match-score__pct">{{ score }}%</span>
      <span class="match-score__tier">{{ tier }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ score: { type: Number, required: true } })

const circumference = 2 * Math.PI * 16
const fillStyle = computed(() => {
  const offset = circumference - (props.score / 100) * circumference
  return { strokeDashoffset: offset }
})
const tier = computed(() => {
  if (props.score >= 90) return 'Excellent'
  if (props.score >= 75) return 'Good'
  if (props.score >= 60) return 'Possible'
  return 'Poor'
})
</script>

<style scoped>
.match-score { display: flex; align-items: center; gap: 10px; }
.match-score__ring { width: 34px; height: 34px; transform: rotate(-90deg); }
.match-score__track { fill: none; stroke: var(--ink-700); stroke-width: 4; }
.match-score__fill {
  fill: none;
  stroke: var(--amber);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 100.5;
  transition: stroke-dashoffset .4s ease;
}
.match-score__label { display: flex; flex-direction: column; line-height: 1.15; }
.match-score__pct { font-size: 13.5px; font-weight: 600; }
.match-score__tier { font-size: 11px; color: var(--paper-faint); }
</style>
