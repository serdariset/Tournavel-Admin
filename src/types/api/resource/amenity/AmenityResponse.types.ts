export interface IGetAmenityResponse {
  Id: string
  ResourceKey: string
  Icon: string | null
  Name: string
  Description: string | null
  Translations: IAmenityTranslation[]
}

export interface IAmenityTranslation {
  Id: string
  AmenityId: string
  LanguageCode: string
  Name: string
  Description: string | null
}

export interface IGetAmenityListResponse {
  Id: string
  ResourceKey: string
  Icon: string | null
  Name: string
  Description: string | null
}

export interface IGetAmenityTranslationListResponse {
  Id: string
  AmenityId: string
  LanguageCode: string
  Name: string
  Description: string | null
  ResourceKey: string
}
