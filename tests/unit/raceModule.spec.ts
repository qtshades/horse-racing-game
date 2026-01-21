import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import raceModule from '../../src/store/modules/race';

describe('race module', () => {
  it('generateHorses commits horses', () => {
    const store = createStore({ modules: { race: raceModule } });
    return store.dispatch('race/generateHorses', 5).then(() => {
      const horses = (store.state as any).race.horses;
      expect(horses).toHaveLength(5);
    });
  });

  it('generateSchedule creates schedule when horses exist', async () => {
    const store = createStore({ modules: { race: raceModule } });
    await store.dispatch('race/generateHorses', 12);
    await store.dispatch('race/generateSchedule');
    const schedule = (store.state as any).race.schedule;
    expect(schedule).toHaveLength(6);
    expect(schedule[0].horses.length).toBeGreaterThan(0);
  });
});
