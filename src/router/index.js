import Vue from 'vue';
import Router from 'vue-router';

import ctrlHome from '@/ctrl-page/home.vue'


Vue.use(Router);
let routers = [
  {
    path: '/',
    name: 'ctrlHome',
    component: ctrlHome,
  },
  {
    path: '/ctrlHome',
    name: 'ctrlHome',
    component: ctrlHome,
  }
]
export default new Router({
  routes: routers,
});
