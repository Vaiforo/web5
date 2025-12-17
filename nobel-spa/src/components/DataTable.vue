<template>
    <section>
        <table>
            <thead>
                <tr>
                    <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="c in columns" :key="c.key">
                        {{ (row[c.key] ?? '—') as any }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
import type { ColumnDef } from '../types/table'

defineProps<{
    columns: ColumnDef[]
    rows: Record<string, unknown>[]
}>()
</script>
