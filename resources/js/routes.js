import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue'),
        name: 'Home',        
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;