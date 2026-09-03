<template>
  <div>
    <Topbar title="Cargo" subtitle="Shipment requirements posted by cargo owners." />
    <section class="page">
      <DataTable :columns="cols" :rows="cargo" empty-text="No cargo posted yet. Connect GET /api/admin/cargo.">
        <template #weight_tons="{ row }">{{ row.weight_tons }} t</template>
        <template #route="{ row }">
          <span class="mono">{{ row.pickup }} → {{ row.destination }}</span>
        </template>
        <template #budget="{ row }">TSh {{ Number(row.budget).toLocaleString() }}</template>
        <template #status="{ row }"><StatusBadge :status="row.status" /></template>
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { CargoAPI } from '../services/api'

const cols = [
  { key: 'cargo_type', label: 'Cargo' },
  { key: 'weight_tons', label: 'Weight' },
  { key: 'route', label: 'Route' },
  { key: 'pickup_date', label: 'Pickup date' },
  { key: 'budget', label: 'Budget' },
  { key: 'status', label: 'Status' }
]

const cargo = ref([
  { id: 1, cargo_type: 'Rice', weight_tons: 7, pickup: 'Arusha', destination: 'Dar es Salaam', pickup_date: '2026-08-20', budget: 800000, status: 'POSTED' }
])

onMounted(async () => {
  try {
    const { data } = await CargoAPI.list()
    if (data?.data?.length) cargo.value = data.data
  } catch (e) {
    console.warn('Using sample cargo — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
</style>
