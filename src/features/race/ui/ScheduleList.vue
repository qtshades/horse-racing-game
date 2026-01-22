<template>
  <div class="schedule-list block">
    <AppTable
        title="Schedule"
        :columns="tableColumns"
        :rows="tableRows"
        table-class="schedule__table"
        empty-text="No schedule"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppTable } from '@/shared/ui';
import { useRaceStore } from '@/features/race';
import type { Round } from '@/entities/race';

type ScheduleTableRow = {
  key: string
  round: number
  distance: string
  horsesCount: number
};

const { schedule } = useRaceStore();

const tableColumns = [
  { key: 'round', label: 'Round', class: 'col-pos' },
  { key: 'distance', label: 'Distance', class: 'col-name' },
  { key: 'horsesCount', label: 'Horses', class: 'col-time' },
];

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
