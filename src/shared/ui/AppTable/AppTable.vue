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

      <tr v-if="!rows.length">
        <td class="empty" :colspan="columns.length">—</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type CellRender = 'text' | 'color';

export type AppTableColumn<Key extends string = string> = {
  key: Key
  label: string
  class?: string
  render?: CellRender
};

export type AppTableRow = Record<string, unknown> & {
  key: string | number
};

const props = withDefaults(
    defineProps<{
      title?: string
      titleClass?: string
      tableClass?: string
      columns?: AppTableColumn[]
      rows?: AppTableRow[]
    }>(),
    {
      title: '',
      titleClass: '',
      tableClass: '',
      columns: () => [],
      rows: () => [],
    }
);

const hasTitle = computed(() => props.title.trim().length);
</script>

<style scoped lang="scss" src="./AppTable.scss"></style>
