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

<style scoped lang="scss">
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: $app-button-radius;
  border: 1px solid transparent;
  font-weight: $app-button-font-weight;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  user-select: none;
  background: $color-primary;
  color: $white;

  &:active {
    transform: translateY(1px);
  }

  &[aria-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--default {
    background: $color-primary;
    color: $white;
  }

  &--primary {
    background: $color-primary-dark;
    color: $white;
  }

  &--ghost {
    background: transparent;
    color: $color-primary-dark;
    border: 1px solid $ghost-border;
  }

  &--sm {
    @include size-sm;
  }
  &--md {
    @include size-md;
  }
  &--lg {
    @include size-lg;
  }
}

.content {
  display: inline-block;
}
</style>
