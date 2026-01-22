import type { Module } from 'vuex';
import type { RootState } from '@/store/types';
import type { RaceState } from './types';

import { type Horse, generateHorses } from '@/entities/horse';

import {
  RACE_DISTANCES,
  simulateRound,
  generateSchedule as createSchedule,
  type Round,
  type RoundResult,
} from '@/entities/race';
import {
  makeRoundPlaceholders,
  makeAllPlaceholders,
  updateResultInPlace,
  getRoundByIndex,
  roundMaxDuration,
  withPositions,
} from './helpers';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

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
    SET_HORSES(state, horses: Horse[]) {
      state.horses = horses;
    },
    SET_SCHEDULE(state, schedule: Round[]) {
      state.schedule = schedule;
    },
    SET_RESULTS(state, results: RoundResult[]) {
      state.results = results;
    },
    RESET_RESULTS(state) {
      state.results = [];
    },
    SET_RUNNING(state, value: boolean) {
      state.running = value;
    },
    SET_CURRENT_ROUND(state, value: number | null) {
      state.currentRound = value;
    },
    UPDATE_RESULT(state, payload: RoundResult) {
      updateResultInPlace(state.results, payload);
    },
    BUMP_RUN_TOKEN(state) {
      state.runToken += 1;
    },
  },

  actions: {
    resetGame({ dispatch, commit }) {
      dispatch('stopRound');
      commit('RESET_RESULTS');
      commit('SET_SCHEDULE', []);
      commit('SET_HORSES', []);
      commit('SET_CURRENT_ROUND', null);
    },
    generateHorses({ dispatch, commit }, count: number = 20) {
      dispatch('resetGame');
      commit('SET_HORSES', generateHorses(count));
    },
    generateSchedule({ state, commit }) {
      if (!state.horses.length) return;

      const schedule = createSchedule(state.horses, RACE_DISTANCES);
      commit('SET_SCHEDULE', schedule);
      commit('SET_RESULTS', makeAllPlaceholders(schedule));

      commit('SET_CURRENT_ROUND', 0);
    },
    async startRound({ state, commit }) {
      if (state.running) return;

      const idx = state.currentRound ?? 0;
      const round = getRoundByIndex(state, idx);
      if (!round) return;

      commit('BUMP_RUN_TOKEN');
      const token = state.runToken;

      commit('SET_RUNNING', true);
      commit('SET_CURRENT_ROUND', idx);
      try {
        commit('UPDATE_RESULT', makeRoundPlaceholders(round));

        const waitMs = roundMaxDuration(round, state);
        await sleep(waitMs);

        if (state.runToken !== token) return;

        const standings = withPositions(simulateRound(round, state.horses));
        commit('UPDATE_RESULT', { round: round.round, standings });

        const nextIdx = idx + 1 < state.schedule.length ? idx + 1 : null;
        commit('SET_CURRENT_ROUND', nextIdx);
      } finally {
        if (state.runToken === token) {
          commit('SET_RUNNING', false);
        }
      }
    },
    stopRound({ state, commit }) {
      commit('BUMP_RUN_TOKEN');
      commit('SET_RUNNING', false);

      const idx = state.currentRound ?? 0;
      const round = getRoundByIndex(state, idx);
      if (!round) return;

      commit('UPDATE_RESULT', makeRoundPlaceholders(round));
      commit('SET_CURRENT_ROUND', idx);
    },
  },
  getters: {
    canStart(state) {
      if (state.running) return false;
      if (!state.schedule.length || !state.horses.length) return false;

      const idx = state.currentRound ?? 0;
      return idx >= 0 && idx < state.schedule.length;
    },
    canStop(state) {
      return state.running;
    },
    canSchedule(state) {
      return !state.running && !!state.horses.length;
    },
  },
};

export default raceModule;
