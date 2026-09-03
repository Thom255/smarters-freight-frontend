<template>
  <div>
    <Topbar title="Dashboard" subtitle="Platform overview, live from the marketplace." />
    <section class="page">
      <div class="grid">
        <StatCard label="Users" :value="summary.users" delta="+4.2% this week" />
        <StatCard label="Active Trucks" :value="summary.activeTrucks" delta="+12 today" />
        <StatCard label="Posted Cargo" :value="summary.postedCargo" delta="+8 today" />
        <StatCard label="Active Shipments" :value="summary.activeShipments" />
        <StatCard label="Completed Shipments" :value="summary.completedShipments" />
        <StatCard label="Platform Revenue" :value="summary.revenue" delta="commission earned" />
      </div>

      <div class="two-col">
        <div class="card panel">
          <h2 class="panel__title">Recent matches</h2>
          <DataTable :columns="matchCols" :rows="recentMatches" empty-text="No matches yet — connect the Laravel API.">
            <template #truck="{ row }"><span class="mono">{{ row.truck }}</span></template>
            <template #cargo="{ row }"><span class="mono">{{ row.cargo }}</span></template>
            <template #score="{ row }"><MatchScore :score="row.score" /></template>
            <template #status="{ row }"><StatusBadge :status="row.status" /></template>
          </DataTable>
        </div>

        <div class="card panel">
          <h2 class="panel__title">Shipments in transit</h2>
          <DataTable :columns="shipmentCols" :rows="inTransit" empty-text="Nothing in transit right now.">
            <template #id="{ row }"><span class="mono">#{{ row.id }}</span></template>
            <template #status="{ row }"><StatusBadge :status="row.status" /></template>
          </DataTable>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import StatCard from '../components/StatCard.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import MatchScore from '../components/MatchScore.vue'
import { DashboardAPI } from '../services/api'

const summary = ref({
  users: '—', activeTrucks: '—', postedCargo: '—',
  activeShipments: '—', completedShipments: '—', revenue: '—'
})

const matchCols = [
  { key: 'truck', label: 'Truck' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'score', label: 'Match score' },
  { key: 'status', label: 'Status' }
]
const shipmentCols = [
  { key: 'id', label: 'Shipment' },
  { key: 'route', label: 'Route' },
  { key: 'status', label: 'Status' }
]

const recentMatches = ref([])
const inTransit = ref([])

onMounted(async () => {
  try {
    // GET /api/admin/dashboard/summary — implement on the Laravel side.
    const { data } = await DashboardAPI.summary()
    summary.value = data.summary ?? summary.value
    recentMatches.value = data.recentMatches ?? []
    inTransit.value = data.inTransit ?? []
  } catch (e) {
    // API not wired up yet — leave placeholders in place.
    console.warn('Dashboard summary not available yet:', e.message)
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.panel { padding: 18px 18px 6px; }
.panel__title { font-family: var(--font-display); font-size: 15px; margin: 4px 8px 14px; }
@media (max-width: 980px) { .two-col { grid-template-columns: 1fr; } }
</style>
