<template>
  <div>
    <Topbar title="Shipments" subtitle="Booking → confirmed → driver assigned → in transit → delivered → completed." />
    <section class="page">
      <DataTable :columns="cols" :rows="shipments" empty-text="No shipments yet.">
        <template #id="{ row }"><span class="mono">#{{ row.id }}</span></template>
        
        <!-- Safely display truck registration number from relation -->
        <template #truck="{ row }">
          <span class="mono">{{ row.truck?.registration_number || 'N/A' }}</span>
        </template>

        <!-- Safely display route names from relations matching Laravel Controller -->
        <template #route="{ row }">
          <span class="mono">
            {{ row.pickupLocation?.name || row.pickup_location?.name || 'N/A' }} 
            → 
            {{ row.destinationLocation?.name || row.destination_location?.name || 'N/A' }}
          </span>
        </template>

        <template #shipment_price="{ row }">TSh {{ Number(row.shipment_price || 0).toLocaleString() }}</template>
        <template #status="{ row }"><StatusBadge :status="row.status" /></template>
        
        <template #actions="{ row }">
          <select :value="row.status" @change="e => updateStatus(row, e.target.value)">
            <option v-for="s in lifecycle" :key="s" :value="s">{{ s }}</option>
          </select>
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
import { ShipmentsAPI } from '../services/api'

const lifecycle = ['CONFIRMED', 'DRIVER_ASSIGNED', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'CANCELLED']

const cols = [
  { key: 'id', label: 'Shipment' },
  { key: 'truck', label: 'Truck' },
  { key: 'route', label: 'Route' },
  { key: 'shipment_price', label: 'Value' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Update status' }
]

const shipments = ref([])

async function updateStatus(row, newStatus) {
  const previousStatus = row.status

  try {
    // api.js already wraps this into { status: newStatus } — pass the
    // plain string here, not an object, or it gets double-wrapped.
    const response = await ShipmentsAPI.updateStatus(row.id, newStatus)
    
    // Update local reactive state only when server responds with success
    row.status = newStatus
    console.log('Shipment status updated successfully in database:', response.data)
  } catch (error) {
    // Revert select input back to original status if server update fails
    row.status = previousStatus
    console.error('Failed to update status on server:', error.response?.data || error.message)
    alert('Failed to update status in database. Check console logs for details.')
  }
}

onMounted(async () => {
  try {
    const { data } = await ShipmentsAPI.list()
    
    // Handle Laravel pagination structure (e.g., data.data contains the array items)
    if (data?.data && Array.isArray(data.data)) {
      shipments.value = data.data
    } else if (Array.isArray(data)) {
      shipments.value = data
    }
  } catch (error) {
    console.warn('Could not fetch shipments from backend API.', error)
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
select { font-size: 12.5px; padding: 6px 8px; }
.mono { font-family: monospace; }
</style>