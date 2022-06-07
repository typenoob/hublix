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
        name: 'register',
        path: '/register',
        component: () => import('@/pages/RegisterPage'),
        meta: {
            title: '注册',
        },
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('@/pages/SearchPage'),
        meta: {
            title: '搜索',
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
        name: 'collection',
        path: '/collection',
        component: () => import('@/pages/CollectionPage'),
        meta: {
            title: '收藏',
        },
    },
    {
        name: 'filter',
        path: '/filter',
        component: () => import('@/pages/FilterPage'),
        meta: {
            title: '筛选',
        },
    },
    {
        name: 'video',
        path: '/video/:id',
        component: () => import('@/pages/VideoPage'),
        meta: {
            title: '视频',
        },
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('@/pages/UserPage'),
        meta: {
            title: '用户',
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
