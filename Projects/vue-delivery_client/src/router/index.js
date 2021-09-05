import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../pages/Home/Home.vue"
import Search from "../pages/Search/Search.vue"
import Order from "../pages/Order/Order.vue"
import Profile from "../pages/Profile/Profile.vue"
import Login from "../pages/Login/Login.vue"
import Shop from "../pages/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopInfos from "../pages/Shop/ShopInfos/ShopInfos.vue"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/shop',
            component: Shop,
            children: [
                {
                    path:'/shop/goods',
                    name: 'ShopDetail',
                    component: ShopGoods
                },
                {
                    path:'/shop/infos',
                    component: ShopInfos
                },
                {
                    path:'/shop/ratings',
                    component: ShopRatings
                },
                {
                    path:'',
                    redirect: '/shop/goods'
                }
            ]
        },
        {
            path:'/',
            redirect: '/home'
        },
    ]
})

export default router