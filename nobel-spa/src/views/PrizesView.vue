<template>
    <DataTable :columns="columns" :rows="rows" />
</template>

<script setup>
import DataTable from '../components/DataTable.vue'

const rows = [
    { category: 'Физика', date: '10 декабря 2024', grant: '≈ 16 млн SEK' },
    { category: 'Химия', date: '11 декабря 2024', grant: '≈ 15 млн SEK' },
    { category: 'Физиология или медицина', date: '12 декабря 2024', grant: '≈ 14 млн SEK' },
    { category: 'Литература', date: '13 декабря 2024', grant: '≈ 13 млн SEK' },
    { category: 'Мир', date: '14 декабря 2024', grant: '≈ 12 млн SEK' },
    { category: 'Экономические науки', date: '15 декабря 2024', grant: '≈ 11 млн SEK' },
]

const columns = [
    { key: 'category', label: 'Категория' },
    { key: 'date', label: 'Дата награждения' },
    { key: 'grant', label: 'Размер гранта' },
]
</script>
