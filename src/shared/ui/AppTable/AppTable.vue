<template>
  <div class="app-table-wrapper">
    <div v-if="hasTitle" class="app-table__title" :class="titleClass">
      {{ title }}
    </div>

    <table class="app-table" :class="tableClass">
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.key" :class="col.class">
          {{ col.label }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="row in rows" :key="row.key">
        <td v-for="col in columns" :key="col.key" :class="col.class">
            <span
                v-if="col.render === 'color'"
                class="cell-color"
                :style="{ background: String(row[col.key]) }"
            />
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>

    <AppTableEmptyState v-if="isEmpty" :text="emptyText" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppTableEmptyState from './AppTableEmptyState.vue';
import type { AppTableColumn, AppTableRow } from './types';

const props = withDefaults(
    defineProps<{
      title?: string
      titleClass?: string
      tableClass?: string
      columns?: AppTableColumn[]
      rows?: AppTableRow[]
      emptyText?: string
    }>(),
    {
      title: '',
      titleClass: '',
      tableClass: '',
      columns: () => [],
      rows: () => [],
      emptyText: '—',
    }
);

const hasTitle = computed(() => props.title.trim().length);
const isEmpty = computed(() => !props.rows.length);
</script>

<style scoped lang="scss" src="./AppTable.scss"></style>
