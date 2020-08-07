import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import LoginToken from '../views/LoginToken.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login/token/:token',
    name: 'login-token',
    component: LoginToken,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
