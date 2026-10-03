import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.VITE_PORT || env.PORT || '3000', 10);
  const backendTarget = env.VITE_BACKEND_URL || 'http://10.8.20.38:8085';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: port,
      host: '0.0.0.0',
      open: false,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
        '/upload_image': {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  };
});

