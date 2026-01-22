<template>
  <div class="race-controls">
    <AppButton
        v-for="btn in buttons"
        :key="btn.key"
        :data-testid="`control-${btn.key}`"
        :disabled="btn.disabled?.() ?? false"
        @click="btn.onClick"
    >
      {{ btn.label }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppButton } from '@/shared/ui';
import { useRaceStore } from '@/features/race';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
    label: t('common.generate'),
    onClick: () => generateHorses(20),
  },
  {
    key: 'schedule',
    label: t('common.schedule'),
    onClick: generateSchedule,
    disabled: () => !canSchedule.value,
  },
  {
    key: 'start',
    label: t('common.start'),
    onClick: startRound,
    disabled: () => !canStart.value,
  },
  {
    key: 'stop',
    label: t('common.stop'),
    onClick: stopRound,
    disabled: () => !canStop.value,
  },
  {
    key: 'reset',
    label: t('common.reset'),
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
