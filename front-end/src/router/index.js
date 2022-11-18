import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Customer from '../views/CustomerView.vue';
import Product from '../views/ProductView.vue';
import { auth } from '../firebase';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: 'about' */ '../views/OrderView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/');
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login');
    return;
  }

  next();
});

export default router;
