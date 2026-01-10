import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'yqwhfc1k',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
    appId: 'eu0ugvwplludoz8ycyyeo3v2',
  },
});

