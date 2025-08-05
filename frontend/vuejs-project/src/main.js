
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'

import IPList from '@/views/IPList.vue'
import CreateIP from "@/views/CreateIP.vue";
import EditIP from "@/views/EditIP.vue";

const routes = [
    {
        path: '/',
        redirect: '/ips'
    },
    {
        path: '/ips',
        name: 'IPList',
        component: IPList
    },
    {
        path: '/ips/create',
        name: 'CreateIP',
        component: CreateIP
    },
    {
        path: '/ips/:id/edit',
        name: 'EditIP',
        component: EditIP
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')