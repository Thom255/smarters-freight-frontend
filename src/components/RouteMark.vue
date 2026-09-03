<template>
  <div class="route-mark" :class="{ compact }">
    <svg viewBox="0 0 120 28" class="route-mark__svg">
      <line x1="2" y1="14" x2="118" y2="14" class="route-mark__dash" />
      <circle cx="6" cy="14" r="4" class="route-mark__origin" />
      <circle cx="114" cy="14" r="4" class="route-mark__dest" />
    </svg>
    <div class="route-mark__text" v-if="!compact">
      <span class="route-mark__title">SMARTERS</span>
      <span class="route-mark__sub">FREIGHT</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ compact: { type: Boolean, default: false } })
</script>

<style scoped>
.route-mark { display: flex; align-items: center; gap: 10px; }
.route-mark__svg { width: 46px; height: 14px; overflow: visible; }
.route-mark__dash {
  stroke: var(--amber);
  stroke-width: 2;
  stroke-dasharray: 5 5;
  animation: dash-travel 2.4s linear infinite;
}
@keyframes dash-travel { to { stroke-dashoffset: -20; } }
.route-mark__origin { fill: var(--paper-faint); }
.route-mark__dest { fill: var(--amber); }
.route-mark__text { display: flex; flex-direction: column; line-height: 1; }
.route-mark__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--paper);
}
.route-mark__sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--amber);
  margin-top: 3px;
}
</style>
