<template>
  <div>
    <Topbar title="Commissions" subtitle="Platform earnings from completed shipments." />
    <section class="page">
      <div class="card rate">
        <div>
          <p class="rate__label">Commission rate</p>
          <p class="rate__hint">Configurable — not hard-coded. Applied to new shipments going forward.</p>
        </div>
        <div class="rate__control">
          <input type="number" v-model.number="rate" min="0" max="100" step="0.5" />
          <span class="mono">%</span>
          <button class="btn btn--primary" @click="saveRate">Save</button>
        </div>
      </div>

      <DataTable :columns="cols" :rows="commissions" empty-text="No commission records yet. Connect GET /api/admin/commissions.">
        <template #shipment_id="{ row }"><span class="mono">#{{ row.shipment_id }}</span></template>
        <template #shipment_amount="{ row }">TSh {{ Number(row.shipment_amount).toLocaleString() }}</template>
        <template #commission_rate="{ row }">{{ row.commission_rate }}%</template>
        <template #commission_amount="{ row }">TSh {{ Number(row.commission_amount).toLocaleString() }}</template>
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import DataTable from '../components/DataTable.vue'
import { CommissionsAPI } from '../services/api'

const cols = [
  { key: 'shipment_id', label: 'Shipment' },
  { key: 'shipment_amount', label: 'Shipment value' },
  { key: 'commission_rate', label: 'Rate' },
  { key: 'commission_amount', label: 'Commission' },
  { key: 'created_at', label: 'Date' }
]

const rate = ref(5)
const commissions = ref([
  { id: 1, shipment_id: 7001, shipment_amount: 800000, commission_rate: 5, commission_amount: 40000, created_at: '2026-08-14' }
])

async function saveRate() {
  try { await CommissionsAPI.updateRate({ rate: rate.value }) } catch (e) { /* API not wired yet */ }
}

onMounted(async () => {
  try {
    const { data } = await CommissionsAPI.list()
    if (data?.data?.length) commissions.value = data.data
  } catch (e) {
    console.warn('Using sample commissions — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; display: flex; flex-direction: column; gap: 18px; }
.rate { padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.rate__label { margin: 0; font-weight: 600; font-size: 14px; }
.rate__hint { margin: 4px 0 0; color: var(--paper-faint); font-size: 12.5px; max-width: 420px; }
.rate__control { display: flex; align-items: center; gap: 8px; }
.rate__control input { width: 90px; }
</style>
