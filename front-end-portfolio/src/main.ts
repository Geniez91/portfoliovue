/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia=createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

registerPlugins(app)

app.mount('#app')
