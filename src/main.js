import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n' 
import App from './App.vue'

import router from './router'
import zh from './locales/zh.json' 

const i18n = createI18n({
  legacy: false, 
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    'zh': zh 
  }
})

const app = createApp(App)
app.use(i18n) 
app.use(router)
app.mount('#app')