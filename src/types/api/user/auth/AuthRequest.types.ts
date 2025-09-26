export interface ILoginRequest {
  Password: string
  ProfileNameOrEmail: string
}

export interface IRefreshTokenRequest {
  RefreshToken: string
}
