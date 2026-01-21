import { ref } from 'vue';
import type { Ref } from 'vue';
import { generateHorses } from '@/entities/horse';
import type { Horse } from '../types';

export function useHorses(initialCount = 20) {
  const horses: Ref<Horse[]> = ref(generateHorses(initialCount));

  function generate(count = initialCount) {
    horses.value = generateHorses(count);
  }

  function findById(id: string) {
    return horses.value.find(h => h.id === id);
  }

  return { horses, generate, findById };
}
