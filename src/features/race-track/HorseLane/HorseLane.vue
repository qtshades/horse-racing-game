<template>
  <div class="horse-lane">
    <div class="horse-info">
      <div class="horse-name">{{ horse.name }}</div>
    </div>

    <div class="track">
      <div class="finish-line" />

      <div
          class="runner"
          :class="{
          running: isAnimatingRun,
          finished: isResultApplied,
        }"
          :style="runnerStyle"
      >
        <HorseIcon class="horse-icon" :style="{ color: horse.color }" />
        <div class="shadow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';

import type { Horse } from '@/entities/horse/types';
import computeDuration from '@/shared/model/computeDuration';
import HorseIcon from '@/shared/assets/icons/horse-running.svg?component';
import { useHorseProgress } from '@/features/race-track/HorseLane/useHorseProgress';

const props = defineProps({
  horse: { type: Object as PropType<Horse>, required: true },
  distance: { type: Number, required: true },
  running: { type: Boolean, default: false },
  cancelToken: { type: Number, required: true },
});

const { progress, start, reset } = useHorseProgress();

const isResultApplied = ref(false);
const finalProgress = ref<number | null>(null);

const uiProgress = computed(() => finalProgress.value ?? progress.value);

const runnerStyle = computed(() => ({
  left: `${uiProgress.value * 100}%`,
  transform: 'translate(-50%, -50%)',
  willChange: 'left, transform',
}));

const isAnimatingRun = computed(() => props.running && finalProgress.value == null && progress.value < 1);

watch(
    () => [props.running, props.distance, props.horse.condition] as const,
    ([running]) => {
      resetUi();

      if (running) {
        start(computeDuration(props.distance, props.horse.condition));
      }
    },
    { immediate: true }
);

watch(
    () => props.cancelToken,
    () => resetUi()
);

function resetUi() {
  reset();
  isResultApplied.value = false;
  finalProgress.value = null;
}
</script>

<style scoped lang="scss" src="./HorseLane.scss"></style>
