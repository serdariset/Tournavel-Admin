import axios, { type AxiosInstance } from 'axios'

export class AxiosManager {
  private static axiosInstance: AxiosInstance | null = null

  private constructor() {}

  public static GetAxiosInstance(): AxiosInstance {
    if (!AxiosManager.axiosInstance) {
      AxiosManager.axiosInstance = axios.create()
      this.SetupInterceptors(AxiosManager.axiosInstance)
    }
    return AxiosManager.axiosInstance
  }

  private static SetupInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )
  }
}
