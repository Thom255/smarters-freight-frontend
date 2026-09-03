<template>
  <span class="badge badge--dot" :class="cls">{{ status }}</span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ status: String })

const map = {
  AVAILABLE: 'badge--available',
  ACTIVE: 'badge--available',
  VERIFIED: 'badge--available',
  COMPLETED: 'badge--completed',
  DELIVERED: 'badge--completed',
  BOOKED: 'badge--booked',
  CONFIRMED: 'badge--booked',
  PENDING: 'badge--booked',
  IN_TRANSIT: 'badge--transit',
  PICKED_UP: 'badge--transit',
  MAINTENANCE: 'badge--maintenance',
  INACTIVE: 'badge--inactive',
  SUSPENDED: 'badge--inactive',
  REJECTED: 'badge--rejected',
  CANCELLED: 'badge--cancelled'
}
const cls = computed(() => map[props.status] || 'badge--inactive')
</script>
