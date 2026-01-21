import type { Module } from 'vuex';
import { generateHorses } from '@/entities/horse/model/horseGenerator';
import type { Horse } from '@/entities/horse/types';
import { generateSchedule as createSchedule } from '@/features/schedule/services/scheduler';
import { simulateRound } from '@/features/race/services/simulator';
import { RACE_DISTANCES } from '@/entities/race';
import type { Round, RoundResult, Standing } from '@/entities/race';
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
      runToken: 0,
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
    SET_CURRENT_ROUND(state, payload: number | null) {
      state.currentRound = payload;
    },
    PUSH_RESULT(state, payload: RoundResult) {
      state.results.push(payload);
    },
    RESET_RESULTS(state) {
      state.results = [];
    },
    BUMP_RUN_TOKEN(state) {
      state.runToken += 1;
    },
  },
  actions: {
    generateHorses({ commit }, count: number = 20) {
      commit('SET_HORSES', generateHorses(count));
    },
    generateSchedule({ state, commit }) {
      if (!state.horses?.length) return;
      commit('SET_SCHEDULE', createSchedule(state.horses, RACE_DISTANCES));
    },
    async runRound(
      { state, commit },
      { roundIndex, token }: { roundIndex: number; token: number }
    ) {
      if (state.runToken !== token) return;

      const round = state.schedule[roundIndex];
      if (!round) throw new Error('Round not found');

      const standings = simulateRound(round, state.horses);

      const withPositions: Standing[] = standings.map((standing, idx) => ({
        ...standing,
        position: standing.position ?? idx + 1,
      }));

      commit('PUSH_RESULT', { round: round.round, standings: withPositions });
    },
    async startRaces({ state, getters, commit, dispatch }) {
      if (!getters.canStart) return;

      commit('BUMP_RUN_TOKEN');
      const token = state.runToken;

      commit('SET_RUNNING', true);

      try {
        for (const [roundIndex] of state.schedule.entries()) {
          if (!state.running || state.runToken !== token) break;

          commit('SET_CURRENT_ROUND', roundIndex);
          await dispatch('runRound', { roundIndex, token });
        }
      } finally {
        if (state.runToken === token) {
          commit('SET_CURRENT_ROUND', null);
          commit('SET_RUNNING', false);
        }
      }
    },
    stopRaces({ commit }) {
      commit('BUMP_RUN_TOKEN');
      commit('SET_RUNNING', false);
      commit('SET_CURRENT_ROUND', null);
    },
    resetGame({ commit, dispatch }) {
      dispatch('stopRaces');
      commit('RESET_RESULTS');
      commit('SET_SCHEDULE', []);
    },
  },
  getters: {
    canStart(state) {
      return (
        !state.running &&
        state.schedule.length &&
        state.horses.length
      );
    },
  },
};

export default raceModule;
