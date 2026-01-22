import { createApp } from 'vue';
import App from '../pages/horse-racing/HorseRacingPage.vue';
import store from '@/app/store';
import i18n from '@/app/i18n';
import '@/app/styles/main.scss';

createApp(App)
  .use(store)
  .use(i18n)
  .mount('#app');
