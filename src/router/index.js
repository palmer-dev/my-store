import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductPage from '../pages/ProductPage.vue'
import CartPage from '../pages/CartPage.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage
        },
        {
            path: '/product/:productId',
            name: 'product',
            component: ProductPage,
            props: true
        }
    ]
});

export default router;