export interface ILoginResponse {
  Token: string
  RefreshToken: string
  ExpiresIn: number
  UserId: string
  ProfileName: string
  Email: string
  Anonymous: boolean
  IsVerified: boolean
  ActivationId: string | null
}

export interface IRefreshTokenResponse {
  Token: string
  RefreshToken: string
  ExpiresIn: number
}
