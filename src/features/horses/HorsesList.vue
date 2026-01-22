<template>
  <div class="horses-list block">
    <AppTable
        title="Horses"
        :columns="tableColumns"
        :rows="tableRows"
        table-class="horses__table"
        empty-text="No horses"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppTable } from '@/shared/ui';
import { useRaceStore } from '@/features/race/composables/useRaceStore';
import type { AppTableColumn } from '@/shared/ui/AppTable/AppTable.vue';

type HorseTableRow = {
  key: string
  color: string
  name: string
  condition: number
};

const { horses } = useRaceStore();

const tableColumns: AppTableColumn[] = [
  { key: 'color', label: '', class: 'col-color', render: 'color' },
  { key: 'name', label: 'Name', class: 'col-name' },
  { key: 'condition', label: 'Cond', class: 'col-cond' },
];

const tableRows = computed<HorseTableRow[]>(() =>
    horses.value.map((horse) => ({
      key: horse.id,
      color: horse.color,
      name: horse.name,
      condition: horse.condition,
    }))
);
</script>

<style scoped lang="scss">
.col-color {
  width: 24px;
}

.col-cond {
  color: $color-muted;
  text-align: right;
}

.col-name {
  font-weight: 600;
}
</style>
