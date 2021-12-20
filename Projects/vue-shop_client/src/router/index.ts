import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../pages/Login/Login.vue"
import Shop from "../pages/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopInfos from "../pages/Shop/ShopInfos/ShopInfos.vue"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path:'/home',
        name:'home',
        component: () => 
            import('../pages/Home/Home.vue'),
        meta: {
            showFooter: true
        }
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/shop',
        component: Shop,
        children: [
            {
                path:'/shop/goods',
                name: 'ShopDetail',
                component: ShopGoods,
                props: true
            },
            {
                path:'/shop/infos',
                component: ShopInfos,
                props: true
            },
            {
                path:'/shop/ratings',
                component: ShopRatings,
                props: true
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

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;