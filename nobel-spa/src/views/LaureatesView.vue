<template>
    <DataTable :columns="columns" :rows="rows" />
</template>

<script setup>
import DataTable from '../components/DataTable.vue'

const rows = [
    { name: 'International Committee of the Red Cross', born: '1863 (основан)', awards: 3 },
    { name: 'Tsung-Dao Lee', born: '24 ноября 1926 (рожд.)', awards: 1 },
    { name: 'Linus Pauling', born: '28 февраля 1901 (рожд.)', awards: 2 },
]

const columns = [
    { key: 'name', label: 'Имя/название' },
    { key: 'born', label: 'Дата рождения/основания' },
    { key: 'awards', label: 'Число премий' },
]
</script>
