import { RouteRecordRaw } from 'vue-router'
import Login from '@/views/Auth/Login.vue'

const AuthRoutes: RouteRecordRaw[] = [
  {
    name: 'login-page',
    path: '/login',
    component: Login,
    meta: {
      isMain: false,
    },
  },
]

export default AuthRoutes
