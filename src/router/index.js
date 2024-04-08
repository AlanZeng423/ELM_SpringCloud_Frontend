import Vue from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import BusinessList from '../views/BusinessList.vue'
import BusinessInfo from '../views/BusinessInfo.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import UserAddress from '../views/UserAddress.vue'
import Payment from '../views/Payment.vue'
import OrderList from '../views/OrderList.vue'
import AddUserAddress from '../views/AddUserAddress.vue'
import EditUserAddress from '../views/EditUserAddress.vue'
import Register from '../views/Register.vue'
import UserInfo from '../views/UserInfo.vue'
import Paying from '../views/Paying.vue'
import SearchResult from '../views/SearchResult.vue'

// Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'Home',
        component: Index
    }, {
        path: '/index',
        name: 'Index',
        component: Index
    }, {
        path: '/businessList',
        name: 'BusinessList',
        component: BusinessList
    }, {
        path: '/businessInfo',
        name: 'BusinessInfo',
        component: BusinessInfo
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/orders',
        name: 'Orders',
        component: Orders
    }, {
        path: '/userAddress',
        name: 'UserAddress',
        component: UserAddress
    }, {
        path: '/payment',
        name: 'Payment',
        component: Payment
    }, {
        path: '/orderList',
        name: 'OrderList',
        component: OrderList
    }, {
        path: '/addUserAddress',
        name: 'AddUserAddress',
        component: AddUserAddress
    }, {
        path: '/editUserAddress',
        name: 'EditUserAddress',
        component: EditUserAddress
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/userInfo',
        name: 'UserInfo',
        component: UserInfo
    }, {
        path: '/paying',
        name: 'Paying',
        component: Paying
    }, {
        path: '/searchResult',
        name: 'SearchResult',
        component: SearchResult 
    }
    ]
//解决重复路由报异常问题
// const originalPush = VueRouter.prototype.push; VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }


// const router = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes
// })
// export default router

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;