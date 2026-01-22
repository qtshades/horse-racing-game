<template>
  <div class="horses-list block">
    <AppTable
        :title="t('horses.title')"
        :columns="tableColumns"
        :rows="tableRows"
        table-class="horses__table"
        :empty-text="t('horses.empty')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppTable, type AppTableColumn } from '@/shared/ui';
import { useI18n } from 'vue-i18n';
import { useRaceStore } from '@/features/race';

type HorseTableRow = {
  key: string
  color: string
  name: string
  condition: number
};

const { t } = useI18n();
const { horses } = useRaceStore();

const tableColumns = computed<AppTableColumn[]>(() => [
  { key: 'color', label: '', class: 'col-color', render: 'color' },
  { key: 'name', label: t('horses.columns.name'), class: 'col-name' },
  { key: 'condition', label: t('horses.columns.condition'), class: 'col-cond' },
]);

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
