import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/match-the-pairs/', // ✅ leave this for deploy
  plugins: [react()],
});

