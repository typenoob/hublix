import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        name: 'notFound',
        path: '/:path(.*)+',
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/LoginPage'),
        meta: {
            title: '登录',
        },
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/HomePage'),
        meta: {
            title: '主页',
        },
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/RegisterPage'),
        meta: {
            title: '注册',
        },
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export { router };
