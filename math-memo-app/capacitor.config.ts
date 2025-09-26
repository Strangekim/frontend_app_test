import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mathapp.memo',
  appName: '수학 메모',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#fef7ed',
      showSpinner: true,
      spinnerColor: '#d97706'
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#d97706'
    }
  }
};

export default config;
