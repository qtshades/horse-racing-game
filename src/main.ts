import { createApp } from 'vue';
import App from './pages/horse-racing/HorseRacingPage.vue';
import store from '@/store';

createApp(App).use(store).mount('#app');
