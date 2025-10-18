import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'; 

import App from './App.vue'
import router from './router/index'


const store = createPinia()

store.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(store)

app.mount('#app')
