import { createApp } from 'vue';
import App from './pages/horse-racing/HorseRacingPage.vue';
import { createStore } from 'vuex';
import raceModule from './store/modules/race';

const store = createStore({
  modules: {
    race: raceModule,
  },
});

createApp(App).use(store).mount('#app');
