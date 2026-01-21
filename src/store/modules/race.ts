import type { Module } from 'vuex';

export type RaceState = {};

export type RootState = {};

const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state(): RaceState {
    return {};
  },
  mutations: {},
  actions: {},
};

export default raceModule;
