<template>
  <button
      :type="nativeType"
      class="app-button"
      :class="buttonClasses"
      :disabled="isDisabled"
      :aria-disabled="isDisabled"
      @click="onClick"
  >
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'default' | 'primary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

const props = withDefaults(
    defineProps<{
      variant?: ButtonVariant
      size?: ButtonSize
      type?: ButtonType
      disabled?: boolean
    }>(),
    {
      variant: 'default',
      size: 'md',
      type: 'button',
      disabled: false,
    }
);

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>();
const isDisabled = computed(() => props.disabled);
const nativeType = computed(() => props.type);

const buttonClasses = computed(() => [
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
]);

function onClick(event: MouseEvent) {
  if (isDisabled.value) return;
  emit('click', event);
}
</script>

<style scoped lang="scss" src="./AppButton.scss"></style>
