<template>
  <section>
    <div class="toolbar">
      <input v-model="year" type="text" placeholder="Год (например 2024)" />
      <select v-model="category">
        <option value="">Все категории</option>
        <option value="phy">Physics</option>
        <option value="che">Chemistry</option>
        <option value="med">Medicine</option>
        <option value="lit">Literature</option>
        <option value="pea">Peace</option>
        <option value="eco">Economics</option>
      </select>
    </div>

    <DataTable :columns="columns" :rows="rows" />

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Назад</button>
      <span>Страница {{ page }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Вперёд</button>
    </div>

    <p v-if="loading">Загрузка...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import DataTable from '../components/DataTable.vue'
import type { ColumnDef } from '../types/table'
import prizesService, { type PrizeRow } from '../services/prizesService'

const columns: ColumnDef[] = [
  { key: 'category', label: 'Категория' },
  { key: 'date', label: 'Год' },
  { key: 'grant', label: 'Сумма' },
]

const rows = ref<PrizeRow[]>([])
const loading = ref(false)
const error = ref('')

const page = ref(1)
const pageSize = 25
const total = ref(0)

const year = ref('')
const category = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

async function load() {
  loading.value = true
  error.value = ''
  try {
    const res = await prizesService.getPrizes({
      page: page.value,
      pageSize,
      nobelPrizeYear: year.value.trim() || undefined,
      nobelPrizeCategory: category.value || undefined,
    })
    rows.value = res.rows
    total.value = res.total
  } catch (e) {
    console.error(e)
    error.value = 'Не удалось загрузить награды'
  } finally {
    loading.value = false
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    void load()
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
    void load()
  }
}

watch([year, category], () => {
  page.value = 1
  void load()
})

onMounted(() => {
  void load()
})
</script>
