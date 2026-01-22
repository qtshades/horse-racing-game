import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createStore } from 'vuex';
import type { Store } from 'vuex';

import type { RaceState } from '@/app/store/modules/race/types';
import type { Horse } from '@/entities/horse';
import type { Round } from '@/entities/race';

vi.mock('@/shared/model/computeDuration', () => ({ default: vi.fn(() => 1) }));

vi.mock('@/entities/race/model/scheduler', () => ({
  generateSchedule: (horses: Horse[], distances: number[]): Round[] => [
    {
      round: 1,
      distance: distances[0] ?? 1200,
      horses: horses.map((h) => h.id),
    },
  ],
}));

vi.mock('@/entities/race/model/simulator', () => ({
  simulateRound: (round: Round) =>
    round.horses.map((horseId: string, idx: number) => ({
      horseId,
      time: 100 + idx,
    })),
}));

const delay = async (ms: number) => {
  vi.advanceTimersByTime(ms);
  await Promise.resolve();
};

const createRaceStore = async () => {
  const { default: raceModule } = await import('@/app/store/modules/race');
  return createStore({ modules: { race: raceModule } });
};

const asRaceState = (store: Store<{ race: RaceState }>) => store.state.race as RaceState;

describe('race store module', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('resetGame clears horses, schedule, results and currentRound', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateHorses', 5);
    await store.dispatch('race/generateSchedule');

    await store.dispatch('race/resetGame');

    const raceState = asRaceState(store);
    expect(raceState.horses).toHaveLength(0);
    expect(raceState.schedule).toHaveLength(0);
    expect(raceState.results).toHaveLength(0);
    expect(raceState.currentRound).toBeNull();
    expect(raceState.running).toBe(false);
  });

  it('generateHorses without args uses default count (20)', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateHorses');

    const raceState = asRaceState(store);
    expect(raceState.horses).toHaveLength(20);
  });

  it('generateSchedule does nothing when there are no horses', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateSchedule');

    const raceState = asRaceState(store);
    expect(raceState.schedule).toHaveLength(0);
    expect(raceState.results).toHaveLength(0);
    expect(raceState.currentRound).toBeNull();
    expect(raceState.running).toBe(false);
  });

  it('generateSchedule sets currentRound to 0 and creates placeholders', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateHorses', 6);
    await store.dispatch('race/generateSchedule');

    const raceState = asRaceState(store);
    expect(raceState.currentRound).toBe(0);
    expect(raceState.schedule).toHaveLength(1);
    expect(raceState.results).toHaveLength(1);

    const roundResult = raceState.results[0];
    expect(roundResult.round).toBe(1);
    expect(roundResult.standings).toHaveLength(6);
    expect(roundResult.standings.every((s) => s.position == null && s.time == null)).toBe(true);
  });

  it('startRound sets running true, then writes standings and advances currentRound', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateHorses', 6);
    await store.dispatch('race/generateSchedule');

    const startPromise = store.dispatch('race/startRound');

    expect(store.getters['race/canStop']).toBe(true);
    expect(store.getters['race/canStart']).toBe(false);

    await delay(1);
    await startPromise;

    const raceState = asRaceState(store);
    expect(raceState.running).toBe(false);
    expect(raceState.currentRound).toBeNull();

    const roundResult = raceState.results.find((r) => r.round === 1);
    expect(roundResult).toBeTruthy();
    expect(roundResult!.standings.every((s) => typeof s.position === 'number' && typeof s.time === 'number')).toBe(true);
  });

  it('stopRound cancels in-flight startRound and restores placeholders', async () => {
    const store = await createRaceStore();

    await store.dispatch('race/generateHorses', 6);
    await store.dispatch('race/generateSchedule');

    const startPromise = store.dispatch('race/startRound');

    expect(store.getters['race/canStop']).toBe(true);

    await store.dispatch('race/stopRound');

    const raceStateAfterStop = asRaceState(store);
    expect(raceStateAfterStop.running).toBe(false);
    expect(raceStateAfterStop.currentRound).toBe(0);

    const roundResultAfterStop = raceStateAfterStop.results.find((r) => r.round === 1)!;
    expect(roundResultAfterStop.standings.every((s) => s.position == null && s.time == null)).toBe(true);

    await delay(5);
    await startPromise;

    const raceStateAfterTimers = asRaceState(store);
    const roundResultAfterTimers = raceStateAfterTimers.results.find((r) => r.round === 1)!;
    expect(roundResultAfterTimers.standings.every((s) => s.position == null && s.time == null)).toBe(true);
    expect(raceStateAfterTimers.running).toBe(false);
    expect(raceStateAfterTimers.currentRound).toBe(0);
  });

  it('getters canSchedule/canStart/canStop reflect state transitions', async () => {
    const store = await createRaceStore();

    expect(store.getters['race/canSchedule']).toBe(false);
    expect(store.getters['race/canStart']).toBe(false);
    expect(store.getters['race/canStop']).toBe(false);

    await store.dispatch('race/generateHorses', 8);

    expect(store.getters['race/canSchedule']).toBe(true);
    expect(store.getters['race/canStart']).toBe(false);
    expect(store.getters['race/canStop']).toBe(false);

    await store.dispatch('race/generateSchedule');

    expect(store.getters['race/canSchedule']).toBe(true);
    expect(store.getters['race/canStart']).toBe(true);
    expect(store.getters['race/canStop']).toBe(false);

    const startPromise = store.dispatch('race/startRound');
    expect(store.getters['race/canStop']).toBe(true);
    expect(store.getters['race/canStart']).toBe(false);

    await delay(2);
    await startPromise;

    expect(store.getters['race/canStop']).toBe(false);
  });
});
