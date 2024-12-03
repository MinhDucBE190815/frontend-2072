import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue';
// import register from '../components/register.vue';
import post from '../components/post.vue';
import home from '../components/home.vue';
import order from '../components/order.vue';
import client from '../components/clientlist.vue';
import statistics from '../components/statistics.vue';

const routes = [
  { path: '/', name: 'home', component: home },
  { path: '/create-post', name: 'CreatePost', component: post },
  { path: '/login', name: 'Login', component: login },
  //  { path: '/register', name: 'Register', component: register },
  { path: '/orders', name: 'Order', component: order },
  { path: '/clients', name: 'ClientList', component: client },
  { path: '/statistics', name: 'Statistics', component: statistics },
  // { path: '/about', name: 'About', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
// Route guard cho authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;