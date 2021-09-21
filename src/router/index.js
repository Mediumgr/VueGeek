import Vue from 'vue'
import Router from 'vue-router'

import PagesPagination from "../components/PagesPagination.vue"
/* import PaymentsDisplay from "../components/PaymentsDisplay.vue" */
import AddPayment from "../components/AddPayment.vue"
import Page404 from "../components/Page404.vue"
Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [{
            path: '',
            /*             name: 'PaymentsDisplay',
                        component: PaymentsDisplay */
        },
        {
            path: '/page/:id',
            component: PagesPagination,
            name: 'PagesPagination'
        },
        {
            path: '/add/payment/',
            name: 'AddPaymentOpen',
            component: AddPayment
        },
        {
            path: '/add/payment/:categoryId',
            name: 'AddPayment',
            component: AddPayment
        },
        {
            path: '*',
            name: 'NotFound',
            component: Page404
        }
    ]
})

export default router