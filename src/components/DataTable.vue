<template>
  <div class="dt card">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody v-if="rows.length">
        <tr v-for="(row, i) in rows" :key="row.id ?? i">
          <td v-for="col in columns" :key="col.key">
            <slot :name="col.key" :row="row">{{ row[col.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!rows.length" class="dt__empty">
      <p>{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true }, // [{ key, label }]
  rows: { type: Array, default: () => [] },
  emptyText: { type: String, default: 'No records yet.' }
})
</script>

<style scoped>
.dt { overflow-x: auto; }
.dt__empty {
  padding: 40px 20px;
  text-align: center;
  color: var(--paper-faint);
  font-size: 13.5px;
}
</style>
