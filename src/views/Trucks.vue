<template>
  <div>
    <Topbar title="Trucks" subtitle="Fleet registered by truck owners and transport companies." />
    <section class="page">
      <DataTable :columns="cols" :rows="trucks" empty-text="No trucks yet. Connect GET /api/admin/trucks.">
        <template #registration_number="{ row }"><span class="mono">{{ row.registration_number }}</span></template>
        <template #capacity_tons="{ row }">{{ row.capacity_tons }} t</template>
        
        <!-- FIX: Template Slot ya kuonyesha jina la eneo badala ya JSON object -->
        <template #current_location="{ row }">
          {{ typeof row.current_location === 'object' && row.current_location !== null
              ? (row.current_location.name || row.current_location.region || 'N/A')
              : (row.current_location || 'N/A') }}
        </template>

        <template #status="{ row }"><StatusBadge :status="row.status" /></template>
        <template #verification_status="{ row }"><StatusBadge :status="row.verification_status" /></template>
        <template #actions="{ row }">
          <button class="btn btn--ghost" @click="verify(row)" v-if="row.verification_status !== 'VERIFIED'">Verify</button>
        </template>
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { TrucksAPI } from '../services/api'

const cols = [
  { key: 'registration_number', label: 'Reg. number' },
  { key: 'truck_type', label: 'Type' },
  { key: 'capacity_tons', label: 'Capacity' },
  { key: 'current_location', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'verification_status', label: 'Verification' },
  { key: 'actions', label: '' }
]

const trucks = ref([
  { id: 1, registration_number: 'T 123 ABC', truck_type: 'Cargo Truck', capacity_tons: 10, current_location: 'Arusha', status: 'AVAILABLE', verification_status: 'VERIFIED' },
  { id: 2, registration_number: 'T 456 XYZ', truck_type: 'Flatbed', capacity_tons: 15, current_location: 'Arusha', status: 'AVAILABLE', verification_status: 'PENDING' },
  { id: 3, registration_number: 'T 789 DEF', truck_type: 'Box Truck', capacity_tons: 5, current_location: 'Dodoma', status: 'MAINTENANCE', verification_status: 'VERIFIED' }
])

async function verify(row) {
  try { await TrucksAPI.verify(row.id) } catch (e) { /* API not wired yet */ }
  row.verification_status = 'VERIFIED'
}

onMounted(async () => {
  try {
    const { data } = await TrucksAPI.list()
    if (data?.data?.length) trucks.value = data.data
  } catch (e) {
    console.warn('Using sample trucks — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
</style>