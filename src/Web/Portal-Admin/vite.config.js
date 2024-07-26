import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

const cherryPickedKeys = [
  // 'VITE_APP_API_URL',
  // 'VITE_APP_MERCHANT_ID',
  // 'VITE_APP_IDENTITY_SERVER',
  // 'VITE_APP_AUTH_CLIENT_ID',
  // 'VITE_APP_AUTH_CLIENT_SECRET',
];

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      'process.env': processEnv,
      global: {},
    },
    plugins: [react(), jsconfigPaths()],
  };
});
