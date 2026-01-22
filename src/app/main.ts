import { createApp } from 'vue';
import App from '../pages/horse-racing/HorseRacingPage.vue';
import store from '@/app/store';
import '@/app/styles/main.scss';

createApp(App).use(store).mount('#app');
