import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ArticleIndex from './views/article/Index';
import ArticleCreate from './views/article/Create';
import ArticleDetail from './views/article/Detail';
import ArticleUpdate from './views/article/Update';
import Login from './views/Login';

const routes = [
    {
        name: 'Login',
        path: '/login',
        component: Login,
    },
    {
        name: 'Home',
        path: '/',
        component: ArticleIndex,
        meta: {
            auth: true
          }
    },
    {
        name: 'Create',
        path: '/create',
        component: ArticleCreate,
    },
    {
        name: 'Detail',
        path: '/detail/:id',
        component: ArticleDetail,
    },
    {
        name: 'Update',
        path: '/update/:id',
        component: ArticleUpdate,
    }
];

const router = new VueRouter({mode: 'history', routes: routes});

router.beforeEach((to, from, next) => { 
    if (to.matched.some(record => record.meta.auth)) {
      if (store.getters.isLoggedIn && store.getters.user) {
        next()
        return
      }
      next('/login')
    }
  
    // if (to.matched.some(record => record.meta.guest)) {
    //   if (!store.getters.isLoggedIn) {
    //     next()
    //     return
    //   }
    //   next('/profile')
    // }
  
    next()
  })
  

export default router;