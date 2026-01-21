import type { Module } from 'vuex';
import { generateHorses, Horse } from '@/entities/horse';
import { generateSchedule as createSchedule } from '@/features/schedule/services/scheduler';
import type { Round } from '@/entities/race';
import { RACE_DISTANCES } from '@/entities/race';
import type { RootState } from '@/store/types';
import type { RaceState } from './types';

const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state(): RaceState {
    return {
      horses: [],
      schedule: [],
      currentRound: null,
      results: [],
      running: false,
    };
  },
  mutations: {
    SET_HORSES(state, payload: Horse[]) {
      state.horses = payload;
    },
    SET_SCHEDULE(state, payload: Round[]) {
      state.schedule = payload;
    },
    SET_RUNNING(state, payload: boolean) {
      state.running = payload;
    },
  },
  actions: {
    generateHorses({ commit }, count: number = 20) {
      const horses = generateHorses(count);
      commit('SET_HORSES', horses);
    },
    generateSchedule({ state, commit }) {
      if (!state.horses?.length) return;
      const schedule = createSchedule(state.horses, RACE_DISTANCES);
      commit('SET_SCHEDULE', schedule);
    },
  },
};

export default raceModule;
