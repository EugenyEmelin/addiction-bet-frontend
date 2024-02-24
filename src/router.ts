import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./layouts/MainLayout.vue'),
            children: [
                {
                    path: '/deposit',
                    name: 'Deposit',
                    component: () => import('./pages/DepositPage.vue'),
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import(`./pages/404.vue`),
            meta: {
                layout: 'main',
            }
        }
    ]
})