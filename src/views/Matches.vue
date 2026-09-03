<template>
  <div>
    <Topbar title="Matching Engine" subtitle="Route, capacity, date, location and availability compared for every truck–cargo pair." />
    <section class="page">
      <DataTable :columns="cols" :rows="matches" empty-text="No matches yet. Connect GET /api/admin/matches.">
        
        <!-- FIX 1: Format Truck display -->
        <template #truck="{ row }">
          <div v-if="typeof row.truck === 'object' && row.truck !== null">
            <strong>{{ row.truck.registration_number }}</strong>
            <div class="sub-text">{{ row.truck.truck_type }} ({{ row.truck.capacity_tons }}t)</div>
          </div>
          <span v-else class="mono">{{ row.truck }}</span>
        </template>

        <!-- FIX 2: Format Cargo display -->
        <template #cargo="{ row }">
          <div v-if="typeof row.cargo === 'object' && row.cargo !== null">
            <strong>{{ row.cargo.cargo_type }}</strong>
            <div class="sub-text">{{ row.cargo.description }}</div>
          </div>
          <span v-else class="mono">{{ row.cargo }}</span>
        </template>

        <template #score="{ row }"><MatchScore :score="row.total_score" /></template>
        <template #breakdown="{ row }">
          <div class="breakdown mono">
            R{{ row.route_score }} · C{{ row.capacity_score }} · D{{ row.date_score }} · L{{ row.location_score }} · A{{ row.availability_score }}
          </div>
        </template>
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
import MatchScore from '../components/MatchScore.vue'
import { MatchesAPI } from '../services/api'

const cols = [
  { key: 'truck', label: 'Truck' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'score', label: 'Score' },
  { key: 'breakdown', label: 'Breakdown (out of 30/25/20/15/10)' },
  { key: 'status', label: 'Status' }
]

const matches = ref([
  { id: 1, truck: 'T 123 ABC', cargo: 'CG001', route_score: 30, capacity_score: 25, date_score: 20, location_score: 15, availability_score: 10, total_score: 100, status: 'SUGGESTED' },
  { id: 2, truck: 'T 456 XYZ', cargo: 'CG001', route_score: 26, capacity_score: 25, date_score: 20, location_score: 12, availability_score: 10, total_score: 93, status: 'VIEWED' }
])

onMounted(async () => {
  try {
    const { data } = await MatchesAPI.list()
    if (data?.data?.length) matches.value = data.data
  } catch (e) {
    console.warn('Using sample matches — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
.breakdown { font-size: 12px; color: var(--paper-dim); }
.sub-text { font-size: 12px; color: var(--paper-dim); margin-top: 2px; }
</style>