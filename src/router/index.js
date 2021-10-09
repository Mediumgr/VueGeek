import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Dashboard',
            component: () => import( /* webpackChunkName: 'Dashboard' */ '../components/Dashboard.vue')
        },
        {
            path: '/page/:id',
            name: 'PagesPagination',
            component: () => import( /* webpackChunkName: 'PagesPagination' */ '../components/PagesPagination.vue')
        },
        {
            path: '/add/payment/',
            name: 'AddPaymentOpen',
            component: () => import( /* webpackChunkName: 'AddPayment' */ '../components/AddPayment.vue')
        },
        {
            path: '/add/payment/:categoryId',
            name: 'AddPayment',
            component: () => import( /* webpackChunkName: 'AddPayment' */ '../components/AddPayment.vue')
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import( /* webpackChunkName: 'Page404' */ '../components/Page404.vue')
        }
    ]
})

export default router