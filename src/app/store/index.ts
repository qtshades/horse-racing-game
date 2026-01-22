import { createStore } from 'vuex';
import race from './modules/race';

export const store = createStore({
  modules: {
    race,
  },
});

export default store;
