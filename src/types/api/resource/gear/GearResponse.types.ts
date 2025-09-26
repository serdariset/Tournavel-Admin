export interface IGetGearListResponse {
  Id: string
  Name: string
  Description: string
  Icon: string | null
  ResourceKey: string
  Translations: ITranslation[]
}

export interface ITranslation {
  LanguageCode: string
  Name: string
  Description: string | null
  TranslationId: string
  GearId: string
}
