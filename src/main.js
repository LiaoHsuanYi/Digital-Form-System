import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'


const app = createApp(App)
app.use(i18n) 
app.use(router)
app.mount('#app')