export interface ITravelPointsSummaryResponse {
  Name: string
  Count: number
}

export interface IDiscoverTravelPointResponse {
  Name: string
  Latitude: number
  Longitude: number
  Address: string | null
  Website: string | null
  PhoneNumber: string | null
  IsTemporarilyClosed: boolean
  IsVerified: boolean
  CoverImageUrl: string | null
  Translations: {
    LanguageCode: string
    Name: string
    Description: string
    Adress: string | null
  }[]
}