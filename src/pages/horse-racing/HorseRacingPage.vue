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
import { HorsesList } from '@/features/horses';
import { RaceControls, ScheduleList, RaceTrack, ResultsTable } from '@/features/race';
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
