import { AxiosManager } from './AxiosManager'
import { SERVICE_PATHS, REQUEST_TYPES } from '@/types/api/ServiceEnums'
import { TokenManager, GetCookie } from '@/utils'
import { COOKIE_NAMES } from '@/types/config/IStorage'
import { ILanguage } from '@/types/static/ILanguage'
import type { ITokenManager } from '@/types/config/ITokenManager'
import type { IResponse } from '@/types/api/BaseResponse'

export default class BaseService {
  protected HTTP = AxiosManager.GetAxiosInstance()
  protected URL: string
  protected PATHS: typeof SERVICE_PATHS
  protected TokenManager: ITokenManager
  protected Language: ILanguage
  protected Token: string | null = null

  constructor(url: string) {
    this.URL = url
    this.PATHS = SERVICE_PATHS
    this.TokenManager = TokenManager.GetInstance()

    const languageCookie = GetCookie(COOKIE_NAMES.LANGUAGE)
    this.Language = (languageCookie ? JSON.parse(languageCookie) : {}) as ILanguage

    this.ConfigureInterceptors()
  }

  private async ConfigureInterceptors() {
    this.Token = await this.TokenManager.GetToken()
    this.HTTP.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.Token}`
        config.headers.language = this.Language.code || 'tr-TR'
        config.headers['Content-Type'] = 'application/json'
        config.params = {
          ...config.params,
          locale: this.Language.code,
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.HTTP.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )
  }

  protected async GET<TResponse>(
    path: string,
    params: any | null = null
  ): Promise<IResponse<TResponse>> {
    try {
      const response = await this.HTTP({
        method: REQUEST_TYPES.GET,
        url: this.URL + path,
        params,
      })
      return response.data as IResponse<TResponse>
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data as IResponse<TResponse>
      } else {
        return {
          Status: false,
          Data: null,
          Total: null,
          Message: error.message || 'Unknown error',
        } as IResponse<TResponse>
      }
    }
  }

  protected async POST<TResponse>(
    path: string,
    data: any | null = null,
    params: any | null = null
  ): Promise<IResponse<TResponse>> {
    try {
      const response = await this.HTTP({
        method: REQUEST_TYPES.POST,
        url: this.URL + path,
        data,
        params,
      })
      return response.data as IResponse<TResponse>
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data as IResponse<TResponse>
      } else {
        return {
          Status: false,
          Data: null,
          Total: null,
          Message: error.message || 'Unknown error',
        } as IResponse<TResponse>
      }
    }
  }

  protected async DELETE<TResponse>(
    path: string,
    params: any | null = null,
    data: any | null = null
  ): Promise<IResponse<TResponse>> {
    try {
      const response = await this.HTTP({
        method: REQUEST_TYPES.DELETE,
        url: this.URL + path,
        params,
        data,
      })
      return response.data as IResponse<TResponse>
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data as IResponse<TResponse>
      } else {
        return {
          Status: false,
          Data: null,
          Total: null,
          Message: error.message || 'Unknown error',
        } as IResponse<TResponse>
      }
    }
  }

  protected async PUT<TResponse>(
    path: string,
    data: any | null = null,
    params: any | null = null
  ): Promise<IResponse<TResponse>> {
    try {
      const response = await this.HTTP({
        method: REQUEST_TYPES.PUT,
        url: this.URL + path,
        data,
        params,
      })
      return response.data as IResponse<TResponse>
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data as IResponse<TResponse>
      } else {
        return {
          Status: false,
          Data: null,
          Total: null,
          Message: error.message || 'Unknown error',
        } as IResponse<TResponse>
      }
    }
  }
}
