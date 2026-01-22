<template>
  <div class="schedule-list">
    <AppTable
        title="Schedule"
        :columns="tableColumns"
        :rows="tableRows"
        table-class="schedule__table"
    />

    <EmptyState v-if="isEmpty" text="No schedule" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppTable from '@/shared/ui/AppTable/AppTable.vue';
import EmptyState from '@/shared/ui/EmptyState.vue';
import { useRaceStore } from '@/features/race/composables/useRaceStore';
import type { Round } from '@/entities/race';

type ScheduleTableRow = {
  key: string
  round: number
  distance: string
  horsesCount: number
};

const { schedule } = useRaceStore();

const isEmpty = computed(() => schedule.value.length);

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
.schedule-list {
  padding: 8px;
}
</style>
