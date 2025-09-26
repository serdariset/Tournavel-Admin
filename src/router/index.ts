import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { TokenManager } from '@/utils'

import AuthRoutes from './AuthRoutes'
import MainRoutes from './MainRoutes'

declare module 'vue-router' {
  interface RouteMeta {
    isMain: boolean
  }
}

const routes: RouteRecordRaw[] = [...AuthRoutes, ...MainRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const tokenManager = TokenManager.GetInstance()
  const requiresAuth = to.matched.some((record) => record.meta.isMain)

  if (requiresAuth) {
    try {
      // GetToken'ı çağır. Gerekirse token'ı kendi içinde yenileyecektir.
      const token = await tokenManager.GetToken()

      if (token) {
        // Token var ve geçerli (veya başarıyla yenilendi), devam et.
        next()
      } else {
        // GetToken null döndü, yani refresh de başarısız oldu ve token'lar temizlendi.
        // Kullanıcıyı giriş sayfasına yönlendir.
        next({ name: 'login-page' })
      }
    } catch (error) {
      // Refresh işlemi bir hata fırlattı.
      console.error('Authentication check failed:', error)
      next({ name: 'login-page' })
    }
  } else {
    // Bu rota kimlik doğrulaması gerektirmiyor, devam et.
    next()
  }
})

export default router
