import { onUnmounted, ref } from 'vue';
import { clamp01 } from '@/shared/lib/clamp';

export function useHorseProgress() {
  const progress = ref(0);
  const isRunning = ref(false);

  let rafId: number | null = null;
  let startedAtMs: number | null = null;
  let durationMs = 1000;

  function cancelRaf() {
    if (rafId != null) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function finish() {
    progress.value = 1;
    cancelRaf();
    isRunning.value = false;
    startedAtMs = null;
  }

  function tick(nowMs: number) {
    if (!isRunning.value) return;

    if (startedAtMs == null) startedAtMs = nowMs;

    const elapsedMs = nowMs - startedAtMs;
    progress.value = clamp01(elapsedMs / durationMs);

    progress.value < 1 ? rafId = requestAnimationFrame(tick) : finish();
  }

  function start(ms = 1000) {
    cancelRaf();

    durationMs = Math.max(1, ms);
    progress.value = 0;
    startedAtMs = null;
    isRunning.value = true;

    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    cancelRaf();
    isRunning.value = false;
    startedAtMs = null;
  }

  function reset() {
    stop();
    progress.value = 0;
    startedAtMs = null;
  }

  onUnmounted(() => cancelRaf());

  return { progress, isRunning, start, reset };
}
