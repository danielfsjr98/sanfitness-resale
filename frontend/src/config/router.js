import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from './../store'

import Home from '@/components/home/Home'
import Auth from '@/components/auth/Auth'
import AdminPages from '@/components/admin/AdminPages'
import Products from '@/components/products/Products'
import ProductById from '@/components/products/ProductById'
import Cart from '@/views/cart/Cart'
import MySales from '@/views/sales/MySales'
import SaleDetail from '@/components/admin/sales/SaleDetail'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
    {
        name: 'auth',
        path: '/',
        component: Auth,
        meta: { requiresSignout: true }
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { requiresLogin: true }
    },
    {
        name: 'admin',
        path: '/admin',
        component: AdminPages,
        meta: { 
            requiresLogin: true,
            requiresAdmin: true
        }
    },
    {
        name: 'products',
        path: '/products',
        component: Products,
        meta: { requiresLogin: true }
    },
    {
        name: 'productById',
        path: '/product/:id',
        component: ProductById,
        meta: { requiresLogin: true }
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart,
        meta: { requiresLogin: true }
    },
    {
        name: 'mySales',
        path: '/mySales',
        component: MySales,
        meta: { requiresLogin: true }
    },
    {
        name: 'SaleDetail',
        path: '/sale/:id',
        component: SaleDetail,
        meta: { requiresLogin: true }
    },
    {
        path: '*',
        name:'404', 
        redirect: '/home'
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresLogin)) {
        localStorage.getItem(userKey) ? next() : next({ path: '/' })
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresSignout)) {
        localStorage.getItem(userKey) ? next({ path: '/home' }) : next()
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/home' })
    } else {
        next()
    }
})

export default router