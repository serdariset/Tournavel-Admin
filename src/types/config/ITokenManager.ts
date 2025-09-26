export interface ITokenManager {
  Initialize: () => void
  GetToken(): Promise<string | null>
  IsTokenExpired(): boolean
  RefreshAccessToken(): Promise<void>
  ClearTokens(): void
}
