import { computed } from 'vue';
import { useStore } from 'vuex';

import type { Horse } from '@/entities/horse/types';
import type { Round } from '@/entities/race';
import { RaceState } from '@/store/modules/race/types';

export function useRaceStore() {
  const store = useStore();

  const raceState = computed<RaceState>(() => store.state.race);

  const horses = computed(() => raceState.value.horses);
  const schedule = computed(() => raceState.value.schedule);
  const results = computed(() => raceState.value.results);

  const running = computed(() => raceState.value.running);
  const runToken = computed(() => raceState.value.runToken);
  const currentRoundIndex = computed(() => raceState.value.currentRound);

  const currentRound = computed<Round | null>(() => {
    const idx = currentRoundIndex.value;
    return idx == null ? null : schedule.value?.[idx] ?? null;
  });

  const horsesById = computed<Record<string, Horse>>(() => {
    const map: Record<string, Horse> = Object.create(null);
    for (const h of horses.value) map[h.id] = h;
    return map;
  });

  const horsesInCurrentRound = computed<Horse[]>(() => {
    const round = currentRound.value;
    if (!round) return [];
    const byId = horsesById.value;
    return round.horses.map((id: string) => byId[id]).filter((h): h is Horse => Boolean(h));
  });

  const canSchedule = computed<boolean>(() => store.getters['race/canSchedule']);
  const canStart = computed<boolean>(() => store.getters['race/canStart']);
  const canStop = computed<boolean>(() => store.getters['race/canStop']);

  const generateHorses = (count = 20) => store.dispatch('race/generateHorses', count);
  const generateSchedule = () => store.dispatch('race/generateSchedule');
  const startRound = () => store.dispatch('race/startRound');
  const stopRound = () => store.dispatch('race/stopRound');
  const resetGame = () => store.dispatch('race/resetGame');

  return {
    raceState,
    horses,
    schedule,
    results,
    running,
    runToken,
    currentRoundIndex,

    currentRound,
    horsesById,
    horsesInCurrentRound,

    canSchedule,
    canStart,
    canStop,

    generateHorses,
    generateSchedule,
    startRound,
    stopRound,
    resetGame,
  };
}
