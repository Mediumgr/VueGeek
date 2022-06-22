import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
document.title = "My expenses";

let router = new Router({
    mode: 'history',
    routes: [{
            path: '',
            name: 'Dashboard',
            component: () => import('../components/Dashboard.vue')
        },
        {
            path: '/page/:id',
            name: 'PagesPagination',
            component: () => import('../components/PagesPagination.vue')
        },
        {
            path: '/add/payment/',
            name: 'AddPaymentOpen',
            component: () => import('../components/AddPayment.vue')
        },
        {
            path: '/add/payment/:categoryId',
            name: 'AddPayment',
            component: () => import('../components/AddPayment.vue')
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import('../components/Page404.vue')
        },
    ]
})

export default router