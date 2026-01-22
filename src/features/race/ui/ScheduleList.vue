<template>
  <div class="schedule-list block">
    <AppTable
        :title="t('schedule.title')"
        :columns="tableColumns"
        :rows="tableRows"
        table-class="schedule__table"
        :empty-text="t('schedule.empty')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppTable } from '@/shared/ui';
import { useI18n } from 'vue-i18n';
import { useRaceStore } from '@/features/race';
import type { Round } from '@/entities/race';

const { t } = useI18n();
const { schedule } = useRaceStore();

type ScheduleTableRow = {
  key: string
  round: number
  distance: string
  horsesCount: number
};

const tableColumns = computed(() => [
  { key: 'round', label: t('schedule.columns.round'), class: 'col-pos' },
  { key: 'distance', label: t('schedule.columns.distance'), class: 'col-name' },
  { key: 'horsesCount', label: t('schedule.columns.horses'), class: 'col-time' },
]);

const tableRows = computed<ScheduleTableRow[]>(() =>
    (schedule.value as Round[]).map((round) => ({
      key: String(round.round),
      round: round.round,
      distance: `${round.distance}m`,
      horsesCount: round.horses.length,
    }))
);
</script>

<style scoped lang="scss">
</style>
