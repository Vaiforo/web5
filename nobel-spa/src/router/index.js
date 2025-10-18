import { createRouter, createWebHashHistory } from 'vue-router'
import PrizesView from '../views/PrizesView.vue'
import LaureatesView from '../views/LaureatesView.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/prizes' },
        { path: '/prizes', component: PrizesView },
        { path: '/laureates', component: LaureatesView },
        { path: '/:pathMatch(.*)*', redirect: '/prizes' },
    ],
    scrollBehavior: () => ({ top: 0 }),
})
