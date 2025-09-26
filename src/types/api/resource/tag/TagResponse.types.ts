export interface IGetTagResponse {
  Id: string
  ResourceKey: string
  ColorHex: string | null
  Icon: string | null
  IsFeatured: boolean
  ParentId: string | null
  Name: string
  Description: string | null
  Translations: ITagTranslation[]
}

export interface ITagTranslation {
  Id: string
  Name: string
  Description: string | null
  LanguageCode: string
  TagId: string
}

export interface IGetTagListResponse {
  Id: string
  ResourceKey: string
  ColorHex: string
  Icon: string | null
  IsFeatured: boolean
  ParentId: string | null
  Name: string
  Description: string | null
  LanguageCode: string
}

export interface IGetTagTranslationListResponse {
  ResourceKey: string
  TagId: string
  Name: string
  Description: string | null
  LanguageCode: string
  Id: string
}
