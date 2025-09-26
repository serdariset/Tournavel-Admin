import { IPaging } from '../../Default.types'

export interface IGetTagRequest {
  Id: string
}

export interface IGetTagListRequest extends IPaging {}

export interface IGetTagTranslationListRequest {
  TagId: string
}

export interface ICreateTagRequest {
  ParentId?: string | null
}

export interface IUpdateTagRequest {
  Id?: string
}

export interface TagPayload extends ICreateTagRequest, IUpdateTagRequest {
  ResourceKey: string
  ColorHex: string | null
  Icon: string | null
  IsFeatured: boolean
}

export interface IDeleteTagRequest {
  Id: string
}

export interface ICreateTagTranslationRequest {
  TagId: string
  Name: string
  LanguageCode: string
  Description: string | null
}

export interface IUpdateTagTranslationRequest {
  TagId: string
  Name: string
  LanguageCode: string
  Description: string | null
}

export interface TagTranslationPayload extends ICreateTagTranslationRequest, IUpdateTagTranslationRequest {
  Id?: string
}

export interface IDeleteTagTranslationRequest {
  Id: string
}
