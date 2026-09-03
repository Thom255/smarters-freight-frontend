<template>
  <div>
    <Topbar title="Reports" subtitle="Platform-wide performance and real-time database analytics." />
    
    <section class="page">
      <!-- Loading State -->
      <div v-if="loading" class="card state-card">
        <p class="mono">Loading live data from database...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="card state-card text-warn">
        <p class="mono">{{ errorMessage }}</p>
      </div>

      <!-- Live Reports Layout -->
      <template v-else>
        <!-- Top Metrics Cards -->
        <div class="metrics-grid">
          <div class="card metric-card">
            <span class="metric-label">Total Completed Shipments</span>
            <div class="metric-value mono">{{ totalCompletedShipments }}</div>
            <span class="metric-sub text-signal">Total from database</span>
          </div>

          <div class="card metric-card">
            <span class="metric-label">Total Commission Earned</span>
            <div class="metric-value mono">
              TSH {{ totalCommissionRevenue.toLocaleString() }}
            </div>
            <span class="metric-sub text-amber">Revenue balance</span>
          </div>

          <div class="card metric-card">
            <span class="metric-label">Top Route Volume</span>
            <div class="metric-value mono">
              {{ topRoutes.length ? topRoutes[0].trips : 0 }} <span class="unit">trips</span>
            </div>
            <span class="metric-sub">{{ topRoutes.length ? topRoutes[0].route : 'No routes' }}</span>
          </div>
        </div>

        <!-- Detail Sections -->
        <div class="reports-grid">
          <!-- Top Routes Table -->
          <div class="card report-card">
            <div class="report-header">
              <h3>Top Routes by Volume</h3>
              <span class="sub-badge mono">Live Data</span>
            </div>
            <table v-if="topRoutes.length">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Completed Trips</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in topRoutes" :key="index">
                  <td class="mono font-bold">{{ item.route || 'Unknown Route' }}</td>
                  <td class="mono text-signal">{{ item.trips }} trips</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-text mono">No route data available at this time.</div>
          </div>

          <!-- Monthly Completed Shipments Breakdown -->
          <div class="card report-card">
            <div class="report-header">
              <h3>Shipments Completed per Month</h3>
              <span class="sub-badge mono">Monthly Trend</span>
            </div>
            <table v-if="completedByMonth.length">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Shipments</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in completedByMonth" :key="index">
                  <td class="mono">{{ row.month }}</td>
                  <td class="mono font-bold">{{ row.total }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-text mono">No monthly shipment data available at this time.</div>
          </div>
        </div>

        <!-- Commission Revenue Trend -->
        <div class="card report-card full-width">
          <div class="report-header">
            <h3>Commission Revenue Trend</h3>
            <span class="sub-badge mono">Revenue per Month</span>
          </div>
          <table v-if="revenueByMonth.length">
            <thead>
              <tr>
                <th>Month</th>
                <th>Commission Revenue (TSH)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in revenueByMonth" :key="index">
                <td class="mono">{{ row.month }}</td>
                <td class="mono text-signal font-bold">TSH {{ Number(row.total || 0).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-text mono">No commission revenue data available at this time.</div>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Topbar from '../components/Topbar.vue'
import { ReportsAPI } from '../services/api'

const completedByMonth = ref([])
const revenueByMonth = ref([])
const topRoutes = ref([])

const loading = ref(true)
const errorMessage = ref('')

const totalCompletedShipments = computed(() => {
  return completedByMonth.value.reduce((sum, item) => sum + Number(item.total || 0), 0)
})

const totalCommissionRevenue = computed(() => {
  return revenueByMonth.value.reduce((sum, item) => sum + Number(item.total || 0), 0)
})

onMounted(async () => {
  try {
    const { data } = await ReportsAPI.overview()
    if (data) {
      completedByMonth.value = data.completedShipmentsByMonth || []
      revenueByMonth.value = data.commissionRevenueByMonth || []
      topRoutes.value = data.topRoutes || []
    }
  } catch (e) {
    console.error('Failed to load database reports:', e)
    errorMessage.value = 'Failed to fetch data. Ensure the GET /api/admin/reports/overview API endpoint is active.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page { padding: 24px 28px; }
.state-card { padding: 24px; text-align: center; }
.text-warn { color: var(--warn); }
.text-signal { color: var(--signal); }
.text-amber { color: var(--amber); }

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.metric-card { padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; }
.metric-label { font-size: 11.5px; color: var(--paper-faint); font-family: var(--font-mono); text-transform: uppercase; }
.metric-value { font-size: 22px; font-weight: 700; color: var(--paper); }
.metric-value .unit { font-size: 14px; font-weight: normal; color: var(--paper-dim); }
.metric-sub { font-size: 11.5px; color: var(--paper-dim); }

.reports-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
@media (max-width: 900px) { .reports-grid { grid-template-columns: 1fr; } }

.full-width { margin-top: 20px; }
.report-card { padding: 20px; }
.report-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
.report-header h3 { margin: 0; font-family: var(--font-display); font-size: 16px; }
.sub-badge { font-size: 10.5px; color: var(--paper-faint); background: var(--ink-700); padding: 2px 8px; border-radius: var(--radius-sm); }
.empty-text { font-size: 12px; color: var(--paper-faint); padding: 12px 0; }
.font-bold { font-weight: 600; }
</style>