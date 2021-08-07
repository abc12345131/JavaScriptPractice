import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../pages/Home/Home.vue"
import Search from "../pages/Search/Search.vue"
import Order from "../pages/Order/Order.vue"
import Profile from "../pages/Profile/Profile.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/home',
            component: Home
        },
        {
            path:'/search',
            component: Search
        },
        {
            path:'/order',
            component: Order
        },
        {
            path:'/profile',
            component: Profile
        },
        {
            path:'/',
            redirect: '/home'
        },
    ]
})

export default router