import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { router } from './router/index'
import store from '@/store/index'
import axios from '@/utils/http'
loadFonts()
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store).use(router).use(vuetify).mount('#app')
