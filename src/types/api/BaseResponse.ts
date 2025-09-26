export interface IResponse<T> {
  Data: T
  Status: boolean
  Message?: string | null
  Total?: number | null
}
