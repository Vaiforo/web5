<template>
    <section>
        <table>
            <thead>
                <tr>
                    <th v-for="c in columns" :key="c.key">
                        {{ c.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="c in columns" :key="c.key">
                        {{ row[c.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
const props = defineProps({
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
})
</script>
