import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./components/layouts/TheBasicLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./views/Dashboard.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('./views/users/Index.vue'),
      },
      {
        path: '/users/edit/:id',
        name: 'userEdit',
        component: () => import('./views/users/Edit.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
