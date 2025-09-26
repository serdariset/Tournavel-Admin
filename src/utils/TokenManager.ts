import { ITokenManager } from '@/types/config/ITokenManager'
import { AxiosManager } from '@/services/AxiosManager'
import { GetCookie, SetCookie, DeleteCookie } from './Cookie'
import { COOKIE_NAMES } from '@/types/config/IStorage'

export class TokenManager implements ITokenManager {
  private static instance: TokenManager
  private token: string | null = null
  private refreshToken: string | null = null
  private tokenExpiry: number | null = null
  private HTTP = AxiosManager.GetAxiosInstance()
  private refreshTokenPromise: Promise<void> | null = null

  private constructor() {}

  static GetInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  Initialize() {
    this.token = GetCookie(COOKIE_NAMES.TOKEN) || null
    this.refreshToken = GetCookie(COOKIE_NAMES.REFRESH_TOKEN) || null
    const expiryFromCookie = GetCookie(COOKIE_NAMES.TOKEN_EXPIRY)
    this.tokenExpiry = expiryFromCookie ? Number(expiryFromCookie) : null
  }

  async GetToken(): Promise<string | null> {

    if (!this.token) {
      this.Initialize()
    }

    if (this.IsTokenExpired()) {
      if (!this.refreshTokenPromise) {
        this.refreshTokenPromise = this.RefreshAccessToken()
      }
      await this.refreshTokenPromise
    }

    return this.token
  }

  IsTokenExpired(): boolean {
    if (!this.tokenExpiry) return true
    const buffer = 5000
    return Date.now() >= this.tokenExpiry - buffer
  }

  async RefreshAccessToken(): Promise<void> {
    try {
      if (!this.refreshToken) {
        return
      }

      const payload = {
        RefreshToken: this.refreshToken,
      }

      const response = await this.HTTP.post<{ Data: { Token: string; ExpiresIn: number } }>(
        'http://localhost:3000/api/v1/user/auth/refresh-token',
        payload
      )

      if (response && response.data && response.data.Data) {
        const { Token, ExpiresIn } = response.data.Data
        this.token = Token
        this.tokenExpiry = Date.now() + ExpiresIn * 1000

        SetCookie(COOKIE_NAMES.TOKEN, this.token, { path: '/' })
        SetCookie(COOKIE_NAMES.TOKEN_EXPIRY, this.tokenExpiry.toString(), { path: '/' })
      } else {
        throw new Error('Invalid response structure from refresh token endpoint.')
      }
    } catch (error) {
      console.error('Failed to refresh access token. Clearing tokens.', error)
      this.ClearTokens()
      throw error
    } finally {
      this.refreshTokenPromise = null
    }
  }

  ClearTokens(): void {
    this.token = null
    this.refreshToken = null
    this.tokenExpiry = null
    DeleteCookie(COOKIE_NAMES.TOKEN, { path: '/' })
    DeleteCookie(COOKIE_NAMES.REFRESH_TOKEN, { path: '/' })
    DeleteCookie(COOKIE_NAMES.TOKEN_EXPIRY, { path: '/' })
  }
}
