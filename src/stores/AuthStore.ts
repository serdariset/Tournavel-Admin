import * as AUTH from '@/types/api'
import { defineStore } from 'pinia'
import { UserAPI } from '@/services'
import { COOKIE_NAMES } from '@/types/config/IStorage'
import { SetCookie } from '@/utils'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    async Login(payload: AUTH.ILoginRequest): Promise<boolean> {
      const { Data, Status } = await UserAPI.Auth.Login(payload)
      if (Status) {
        SetCookie(COOKIE_NAMES.TOKEN, Data.Token)
        SetCookie(COOKIE_NAMES.REFRESH_TOKEN, Data.RefreshToken)
        SetCookie(COOKIE_NAMES.TOKEN_EXPIRY, Data.ExpiresIn.toString())
      }
      return Status
    },
  },
})
