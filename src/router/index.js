import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/Notes.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import GuestLayout from '../layouts/GuestLayout.vue'
import guest from '@/middleware/guest'
import auth from '@/middleware/auth'
import middlewarePipeline from './middlewarePipeline'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotesView,
      meta:{
        layout:GuestLayout,
        middleware: [
          guest
        ]
      }
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddNote.vue'),
      meta:{
        layout:AdminLayout,
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditNote.vue'),
      meta:{
        layout:GuestLayout,
        middleware: [
          guest
        ]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta:{
        layout:GuestLayout,
        middleware: [
          guest
        ]
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})
export default router
