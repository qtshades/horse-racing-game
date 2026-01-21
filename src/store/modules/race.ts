import { Module } from 'vuex'

export type RaceState = any;

const raceModule: Module<RaceState, any> = {
  namespaced: true,
  state(): RaceState {
    return {}
  },
  mutations: {},
  actions: {},
}

export default raceModule
