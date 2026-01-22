<template>
  <div class="race-track">
    <div v-if="currentRound">
      <h3>Round {{ currentRound.round }} — {{ currentRound.distance }}m</h3>

      <div class="lanes">
        <HorseLane
            v-for="horse in horsesInCurrentRound"
            :key="horse.id"
            :horse="horse"
            :distance="currentRound.distance"
            :running="running"
            :cancel-token="runToken"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HorseLane from './HorseLane/HorseLane.vue';
import { useRaceStore } from '@/features/race/composables/useRaceStore';

const { currentRound, horsesInCurrentRound, running, runToken } = useRaceStore();
</script>

<style scoped lang="scss">
.race-track {
  flex: 1;
}

.lanes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
