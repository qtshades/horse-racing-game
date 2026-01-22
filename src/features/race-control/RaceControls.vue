<template>
  <div class="race-controls">
    <AppButton
        v-for="btn in buttons"
        :key="btn.key"
        :disabled="btn.disabled?.() ?? false"
        @click="btn.onClick"
    >
      {{ btn.label }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { useRaceStore } from '@/features/race/composables/useRaceStore';

const {
  canSchedule,
  canStart,
  canStop,
  generateHorses,
  generateSchedule,
  startRound,
  stopRound,
  resetGame,
} = useRaceStore();

type ControlButton = {
  key: string
  label: string
  onClick: () => void
  disabled?: () => boolean
};

const buttons = computed<ControlButton[]>(() => [
  {
    key: 'generate',
    label: 'Generate',
    onClick: () => generateHorses(20),
  },
  {
    key: 'schedule',
    label: 'Schedule',
    onClick: generateSchedule,
    disabled: () => !canSchedule.value,
  },
  {
    key: 'start',
    label: 'Start',
    onClick: startRound,
    disabled: () => !canStart.value,
  },
  {
    key: 'stop',
    label: 'Stop',
    onClick: stopRound,
    disabled: () => !canStop.value,
  },
  {
    key: 'reset',
    label: 'Reset',
    onClick: resetGame,
  },
]);
</script>

<style scoped lang="scss">
.race-controls {
  padding: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
