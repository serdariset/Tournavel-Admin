import { IPaging } from '../../Default.types'

export interface IGetAmenityRequest {
  Id: string
}

export interface IGetAmenityListRequest extends IPaging {}

export interface IGetAmenityTranslationListRequest {
  AmenityId: string
}

export interface IAmenityPayload {
  Id?: string
  ResourceKey: string
  Icon: string | null
}

export interface IDeleteAmenityRequest {
  Id: string
}

export interface IAmenityTranslationPayload {
  Id?: string
  AmenityId: string
  Name: string
  Description: string | null
  LanguageCode: string
}

export interface IDeleteAmenityTranslationRequest {
  Id: string
}