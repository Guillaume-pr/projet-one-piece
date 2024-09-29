import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sunny.fr',
  appName: 'vogue merry',
  webDir: 'build',
  "bundledWebRuntime": false,
  "server": {
    "cleartext": true // Ceci permet d'utiliser HTTP, mais fais attention à la sécurité
  }
};

export default config;
