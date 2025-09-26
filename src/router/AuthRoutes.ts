import { RouteRecordRaw } from 'vue-router'

const AuthRoutes: RouteRecordRaw[] = [
  {
    name: 'login-page',
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      isMain: false,
    },
  },
]

export default AuthRoutes
