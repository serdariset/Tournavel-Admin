import BaseService from '@/services/BaseService'
import * as AUTH from '@/types/api/user/auth'

export default class AuthServices extends BaseService {
  Login(payload: AUTH.ILoginRequest) {
    return this.POST<AUTH.ILoginResponse>(this.PATHS.LOGIN, payload)
  }

  RefreshToken(payload: AUTH.IRefreshTokenRequest) {
    return this.POST<AUTH.IRefreshTokenResponse>(this.PATHS.REFRESH_TOKEN, payload)
  }
}
