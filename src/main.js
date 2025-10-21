import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router/index'


const store = createPinia()
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'bootstrapLike',
        themes: {
            bootstrapLike: {
                colors: {
                    primary: '#b4b7edff', // fallback for components that require a solid color
                    secondary: '#6c757d',     // Bootstrap secondary gray
                    success: '#198754',
                    info: '#0dcaf0',
                    warning: '#ffc107',
                    danger: '#dc3545',
                    light: '#f8f9fa',
                    dark: '#212529'
                }
            }
        }
    }
})
store.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(store)

app.mount('#app')
