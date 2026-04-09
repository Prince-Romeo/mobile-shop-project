import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // 👈 router import करो
import './style.css'

createApp(App)
  .use(router)   // 👈 सबसे important
  .mount('#app')