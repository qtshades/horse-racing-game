declare module '@vitejs/plugin-vue' {
  import type { Plugin } from 'vite';
  const plugin: (...args: unknown[]) => Plugin;
  export default plugin;
}
