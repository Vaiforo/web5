<template>
  <section>
    <div class="toolbar">
      <input
        v-model="filterText"
        type="text"
        placeholder="Поиск по имени..."
      />
    </div>

    <DataTable :columns="columns" :rows="paginatedRows" />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        Назад
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперёд
      </button>
    </div>

    <p v-if="loading" class="loading">Загрузка дичи...</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DataTable from '../components/DataTable.vue'
import laureatesService from '../services/laureatesService.js'

const columns = [
  { key: 'name', label: 'Имя/название' },
  { key: 'born', label: 'Дата рождения/основания' },
  { key: 'awards', label: 'Число премий' },
]

const allRows = ref([])
const loading = ref(false)
const error = ref('')
const filterText = ref('')
const currentPage = ref(1)
const pageSize = 10

const filteredRows = computed(() => {
  const text = filterText.value.trim().toLowerCase()
  if (!text) return allRows.value
  return allRows.value.filter((row) =>
    row.name.toLowerCase().includes(text)
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRows.value.length / pageSize))
)

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
    const rows = await laureatesService.getLaureates()
    allRows.value = rows
  } catch (e) {
    error.value = 'Не удалось загрузить данные лауреатов'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
