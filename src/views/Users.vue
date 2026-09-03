<template>
  <div>
    <Topbar title="Users" subtitle="Truck owners, cargo owners and admins on the platform." />
    <section class="page">
      <div class="toolbar">
        <input class="search" v-model="q" placeholder="Search by name or email…" />
      </div>
      <DataTable :columns="cols" :rows="filtered" empty-text="No users yet. Connect GET /api/admin/users.">
        <template #full_name="{ row }"><strong>{{ row.full_name }}</strong></template>
        <template #role="{ row }"><span class="mono">{{ row.role }}</span></template>
        <template #status="{ row }"><StatusBadge :status="row.status" /></template>
        <template #actions="{ row }">
          <button class="btn btn--ghost" @click="suspend(row)">Suspend</button>
        </template>
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import DataTable from '../components/DataTable.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { UsersAPI } from '../services/api'

const cols = [
  { key: 'full_name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
]

const q = ref('')
const users = ref([
  { id: 1, full_name: 'Thomas Mushi', email: 'thomas@abctransport.co.tz', role: 'TRUCK_OWNER', status: 'ACTIVE' },
  { id: 2, full_name: 'XYZ Trading Ltd', email: 'ops@xyztrading.co.tz', role: 'CARGO_OWNER', status: 'ACTIVE' },
  { id: 3, full_name: 'Grace Mwakalinga', email: 'grace@smartersfreight.co.tz', role: 'ADMIN', status: 'ACTIVE' }
])

const filtered = computed(() =>
  users.value.filter(u =>
    u.full_name.toLowerCase().includes(q.value.toLowerCase()) ||
    u.email.toLowerCase().includes(q.value.toLowerCase()))
)

async function suspend(row) {
  try {
    await UsersAPI.suspend(row.id)
    row.status = 'SUSPENDED'
  } catch (e) {
    row.status = 'SUSPENDED' // optimistic fallback while API is not wired up
  }
}

onMounted(async () => {
  try {
    const { data } = await UsersAPI.list()
    if (data?.data?.length) users.value = data.data
  } catch (e) {
    console.warn('Using sample users — connect the Laravel API to replace this.')
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; display: flex; flex-direction: column; gap: 16px; }
.toolbar { display: flex; justify-content: flex-end; }
.search { width: 280px; }
</style>
