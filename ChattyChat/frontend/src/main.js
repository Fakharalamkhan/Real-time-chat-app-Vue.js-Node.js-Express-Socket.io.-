import * as Vue from 'vue'
import BootstrapVue3 from "bootstrap-vue-3";
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-3-socket.io';
import App from './App.vue'
import router from './router'

//Bootstrap v5
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import './assets/main.css'

const app = Vue.createApp({
    render: () => Vue.h(App)
});

app.use(BootstrapVue3);
app.use(new VueSocketIO({
    connection: SocketIO('http://localhost:8080',
        {
            path: '',
        }),
}));

app.use(router)

app.mount('#app')
