import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/iconfont.css'
import axios from 'axios'
const app = createApp(App)
//axios挂载到原型
app.config.globalProperties.$http = axios
app.use(store).use(router).mount('#app')
