<template>
  <section>
    <div class="toolbar">
      <input v-model="filterText" type="text" placeholder="Фильтр по имени..." />
    </div>

    <DataTable :columns="columns" :rows="paginatedRows" />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Вперёд</button>
    </div>

    <p v-if="loading">Загрузка...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import DataTable from '../components/DataTable.vue'
import type { ColumnDef } from '../types/table'
import laureatesService, { type LaureateRow } from '../services/laureatesService'

const columns: ColumnDef[] = [
  { key: 'name', label: 'Имя/название' },
  { key: 'born', label: 'Дата рождения/основания' },
  { key: 'awards', label: 'Число премий' },
]

const allRows = ref<LaureateRow[]>([])
const loading = ref(false)
const error = ref<string>('')
const filterText = ref<string>('')

const currentPage = ref<number>(1)
const pageSize = 10

const filteredRows = computed(() => {
  const text = filterText.value.trim().toLowerCase()
  if (!text) return allRows.value
  return allRows.value.filter((r) => r.name.toLowerCase().includes(text))
})

watch(filterText, () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    allRows.value = await laureatesService.getLaureates()
  } catch (e) {
    console.error(e)
    error.value = 'Не удалось загрузить данные лауреатов'
  } finally {
    loading.value = false
  }
})
</script>
