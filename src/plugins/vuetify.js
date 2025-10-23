
import 'vuetify/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
     defaultTheme: 'bootstrapLike',
      themes: {
        bootstrapLike: {
          colors: {
            primary: '#b4b7edff', // fallback for components that require a solid color
            secondary: '#6c757d',     // Bootstrap secondary gray
            success: '#3a5f5dff',
            info: '#0dcaf0',
            warning: '#ffc107',
            danger: '#dc3545',
            light: '#f8f9fa',
            dark: '#6f7881ff'
          }
      }
    }
    }
})
