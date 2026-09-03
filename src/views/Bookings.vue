<template>
  <div>
    <Topbar title="Bookings" subtitle="Formal requests to convert a match into a shipment." />
    <section class="page">
      <DataTable :columns="cols" :rows="bookings" empty-text="No bookings yet. Connect GET /api/admin/bookings.">
        <template #id="{ row }"><span class="mono">#{{ row.id }}</span></template>
        <template #booking_price="{ row }">TSh {{ Number(row.booking_price).toLocaleString() }}</template>
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
import { BookingsAPI } from '../services/api'

const cols = [
  { key: 'id', label: 'Booking' },
  { key: 'truck', label: 'Truck' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'booking_price', label: 'Price' },
  { key: 'requested_at', label: 'Requested' },
  { key: 'status', label: 'Status' }
]

const bookings = ref([
  { id: 5001, truck: 'T 123 ABC', cargo: 'CG001', booking_price: 800000, requested_at: '2026-08-15 09:12', status: 'ACCEPTED' }
])

onMounted(async () => {
  try {
    const { data } = await BookingsAPI.list()
    if (data?.data?.length) bookings.value = data.data
  } catch (e) {
    console.warn('Using sample bookings — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
</style>
