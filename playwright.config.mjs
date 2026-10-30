import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:true,use:{baseURL:'http://127.0.0.1:4173',launchOptions:{executablePath:'/usr/bin/chromium',args:['--no-sandbox']}},reporter:'list',webServer:{command:'npm run dev',url:'http://127.0.0.1:4173',reuseExistingServer:true}});
