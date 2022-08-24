import { RouteRecordRaw } from 'vue-router'
import BlogLayout from '../layouts/BlogLayout.vue';
import SignLayout from '../layouts/SignLayout.vue'
import MyLayout from '../layouts/MyLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BlogLayout,
    children: [
      {
        path: '',
        component: () => import('../views/pub/Home/index.vue'),
      },
      {
        path: 'categories/:id',
        component: () => import('../views/pub/Home/index.vue'),
      },
      {
        path: 'articles/:id',
        component: () => import('../views/pub/ArticleDetail/index.vue'),
      }
    ]
  },
  {
    path: '/sign',
    component: SignLayout,
    children: [
      {
        path: 'login',
        component: () => import('../views/pub/Login/index.vue')
      },
      {
        path: 'register',
        component: () => import('../views/pub/Register/index.vue')
      },
    ]
  },
  {
    path: '/my',
    component: MyLayout,
    children: [
      {
        path: 'articles',
        component: () => import('../views/my/ArticleList/index.vue')
      },
      {
        path: 'profile',
        component: () => import('../views/my/UserProfile/index.vue')
      },
    ]
  }
]

export default routes