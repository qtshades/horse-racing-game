<template>
  <div class="app-empty" role="status" aria-live="polite">
    <span class="app-empty__content">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      text?: string
    }>(),
    {
      text: '',
    }
);

const message = props.text.trim() || '—';
</script>

<style scoped lang="scss">
.app-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: $white;
  border-radius: 10px;
  box-shadow: $panel-shadow;
}

.app-empty__content {
  color: $color-muted;
  font-weight: 600;
  letter-spacing: 0.2px;
}
</style>
