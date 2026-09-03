<template>
  <div>
    <Topbar title="Drivers" subtitle="Drivers associated with registered trucks." />
    <section class="page">
      <DataTable :columns="cols" :rows="drivers" empty-text="No drivers yet. Connect GET /api/admin/drivers.">
        <template #license_number="{ row }"><span class="mono">{{ row.license_number }}</span></template>
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
import { DriversAPI } from '../services/api'

const cols = [
  { key: 'full_name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'license_number', label: 'License' },
  { key: 'license_expiry', label: 'Expiry' },
  { key: 'status', label: 'Status' }
]

const drivers = ref([
  { id: 1, full_name: 'John Michael', phone: '07XXXXXXXX', license_number: 'DL123456', license_expiry: '2027-03-01', status: 'ACTIVE' }
])

onMounted(async () => {
  try {
    const { data } = await DriversAPI.list()
    if (data?.data?.length) drivers.value = data.data
  } catch (e) {
    console.warn('Using sample drivers — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
</style>
