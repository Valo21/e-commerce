import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.valo.ecommerce',
  appName: 'ecommerce',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
