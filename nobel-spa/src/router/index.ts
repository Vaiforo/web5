import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import PrizesView from '../views/PrizesView.vue'
import LaureatesView from '../views/LaureatesView.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/prizes' },
    { path: '/prizes', component: PrizesView },
    { path: '/laureates', component: LaureatesView },
    { path: '/:pathMatch(.*)*', redirect: '/prizes' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
})

export default router
