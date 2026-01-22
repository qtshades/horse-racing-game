<template>
  <div class="horse-racing-page">
    <RaceControls />
    <div class="layout">
      <aside class="controls">
        <ScheduleList />
        <HorsesList />
      </aside>
      <RaceTrack />
      <ResultsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceControls from '../../features/race-control/RaceControls.vue';
import ScheduleList from '../../features/schedule/ScheduleList.vue';
import HorsesList from '../../features/horses/HorsesList.vue';
import RaceTrack from '../../features/race-track/RaceTrack.vue';
import ResultsTable from '../../features/results/ResultsTable.vue';
</script>

<style scoped lang="scss">
.horse-racing-page {
  padding: 16px;
}

.layout {
  display: flex;
  gap: 24px;
}

.controls {
  max-height: 90vh;
  overflow-y: auto;
  width: 320px;
}
</style>
