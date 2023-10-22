import react from '@vitejs/plugin-react-swc';
import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@style': join(__dirname, './src/style'),
    },
  },
});
