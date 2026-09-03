<template>
  <div class="nf">
    <p class="mono nf__code">404</p>
    <p class="nf__text">This route isn't on the manifest.</p>
    <RouterLink to="/" class="btn btn--primary">Back to dashboard</RouterLink>
  </div>
</template>

<style scoped>
.nf { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; background: var(--ink-950); color: var(--paper); }
.nf__code { font-size: 42px; color: var(--amber); }
.nf__text { color: var(--paper-faint); margin-bottom: 8px; }
</style>
