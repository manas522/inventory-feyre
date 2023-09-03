import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/main";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  defaultSet: 'mdi',
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')
