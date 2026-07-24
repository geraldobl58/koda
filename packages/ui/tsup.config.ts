import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.build.json',
  dts: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";',
  },
});
