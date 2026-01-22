<template>
  <div class="results">
    <section v-for="roundTable in roundTables" :key="roundTable.roundNumber" class="round">
      <AppTable
          :title="roundTable.title"
          :columns="tableColumns"
          :rows="roundTable.rows"
          table-class="round__table"
          empty-text="—"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppTable from '@/shared/ui/AppTable/AppTable.vue';
import { RACE_DISTANCES, type RoundResult, type Standing } from '@/entities/race';
import type { Horse } from '@/entities/horse';
import { useRaceStore } from '@/features/race/composables/useRaceStore';

type ResultTableRow = {
  key: string
  horseId: string
  position: string | number
  name: string
  time: string
};

const { results, horsesById } = useRaceStore();

const tableColumns = [
  { key: 'position', label: 'Position', class: 'col-pos' },
  { key: 'name', label: 'Name', class: 'col-name' },
  { key: 'time', label: 'Time', class: 'col-time' },
];

const roundTables = computed(() => {
  return results.value.map((roundResult: RoundResult) => {
    const roundNumber = roundResult.round;
    const distanceMeters = getRoundDistanceMeters(roundNumber);

    return {
      roundNumber,
      title: `${formatRoundOrdinal(roundNumber)} Lap - ${distanceMeters}m`,
      rows: mapStandingsToTableRows(roundNumber, roundResult.standings),
    };
  });
});

function mapStandingsToTableRows(roundNumber: number, standings: Standing[]): ResultTableRow[] {
  return standings.map((standing) => {
    const horseId = standing.horseId;

    return {
      key: `${roundNumber}-${horseId}`,
      horseId,
      position: standing.position ?? '—',
      name: getHorseNameById(horseId),
      time: standing.time != null ? `${standing.time}ms` : '—',
    };
  });
}

function getHorseNameById(horseId: string): string {
  const horse = (horsesById.value as Record<string, Horse>)[horseId];
  return horse?.name ?? horseId;
}

function getRoundDistanceMeters(roundNumber: number): number {
  return RACE_DISTANCES[roundNumber - 1] ?? 0;
}

function formatRoundOrdinal(roundNumber: number): string {
  const mod100 = roundNumber % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${roundNumber}TH`;

  const suffixByMod10: Record<number, string> = { 1: 'ST', 2: 'ND', 3: 'RD' };
  return `${roundNumber}${suffixByMod10[roundNumber % 10] ?? 'TH'}`;
}
</script>

<style scoped lang="scss">
.results {
  width: 320px;
  background: $color-bg;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 8px;
  padding-right: 8px;
}

.round {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .results {
    width: 100%;
    max-height: 50vh;
  }
}
</style>
