import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.VITE_PORT || env.PORT || '2048', 10);
  const host = env.VITE_HOST || env.HOST || '0.0.0.0';
  const backendTarget = env.VITE_BACKEND_URL || env.VITE_API_TARGET || 'http://10.8.20.38:8085';

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      host: host,
      port: port,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
        '/upload_image': {
          target: backendTarget,
          changeOrigin: true,
        }
      }
    },
    preview: {
      host: host,
      port: port,
    }
  };
});

