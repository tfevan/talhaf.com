import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCalendarHeatmap)

app.mount('#app')
