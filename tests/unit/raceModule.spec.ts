import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import type { ActionContext } from 'vuex';
import raceModule from '../../src/store/modules/race';
import { RaceState } from '@/store/modules/types';
import { RACE_DISTANCES } from '../../src/entities/race';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('race module', () => {
  it('generateHorses commits horses', () => {
    const store = createStore({ modules: { race: raceModule } });
    return store.dispatch('race/generateHorses', 5).then(() => {
      const horses = store.state.race.horses;
      expect(horses).toHaveLength(5);
    });
  });

  it('generateSchedule creates schedule when horses exist', async () => {
    const store = createStore({ modules: { race: raceModule } });
    await store.dispatch('race/generateHorses', 12);
    await store.dispatch('race/generateSchedule');
    const schedule = store.state.race.schedule;
    expect(schedule).toHaveLength(6);
    expect(schedule[0].horses.length).toBeGreaterThan(0);
  });

  it('generateHorses + generateSchedule produce schedule with expected rounds', async () => {
    const store = createStore({ modules: { race: raceModule } });
    await store.dispatch('race/generateHorses', 12);
    await store.dispatch('race/generateSchedule');

    const schedule = store.state.race.schedule;
    expect(Array.isArray(schedule)).toBe(true);
    expect(schedule.length).toBe(RACE_DISTANCES.length);
    expect(schedule[0].horses.length).toBeGreaterThan(0);
  });

  it('startRaces runs through all rounds and stores results (no return values)', async () => {
    const store = createStore({ modules: { race: raceModule } });
    await store.dispatch('race/generateHorses', 12);
    await store.dispatch('race/generateSchedule');

    const ret = await store.dispatch('race/startRaces');

    expect(ret).toBeUndefined();

    const state = store.state.race;
    expect(state.results.length).toBe(state.schedule.length);
    expect(state.running).toBe(false);
    expect(state.currentRound).toBeNull();
  });

  it('stopRaces aborts running startRaces (midway)', async () => {
    const slowRunRound = async (
      { commit }: ActionContext<RaceState, unknown>,
      { roundIndex }: { roundIndex: number }
    ) => {
      await delay(60);
      commit('PUSH_RESULT', { round: roundIndex + 1, standings: [] });
    };

    const slowModule = {
      ...raceModule,
      actions: {
        ...(raceModule.actions || {}),
        runRound: slowRunRound,
      },
    };

    const store = createStore({ modules: { race: slowModule } });
    await store.dispatch('race/generateHorses', 12);
    await store.dispatch('race/generateSchedule');

    const promise = store.dispatch('race/startRaces');
    await delay(20);
    await store.dispatch('race/stopRaces');
    await promise;

    const state = store.state.race;
    expect(state.results.length).toBeLessThan(state.schedule.length);
    expect(state.running).toBe(false);
    expect(state.currentRound).toBeNull();
  });
});
