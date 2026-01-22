declare module '*.svg?component' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, unknown, unknown>;
  export default component;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
