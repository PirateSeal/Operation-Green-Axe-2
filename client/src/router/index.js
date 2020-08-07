import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import HomeLogged from '../views/Logged/HomeLogged.vue';
import LoginToken from '../views/Logged/LoginToken.vue';
import Admin from '../views/Logged/Admin.vue';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        next('/Home');
      }
    },
  },
  {
    path: '/login/token/:token',
    name: 'login-token',
    component: LoginToken,
  },
  {
    path: '/Home',
    name: 'HomeLogged',
    component: HomeLogged,
  },
  {
    path: '/Admin',
    name: 'admin',
    component: Admin,
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        if (store.getters.isAdmin) next();
      } else {
        next('/');
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
