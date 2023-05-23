import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios";


//set base url 
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL || "http://localhost:5000/api"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
