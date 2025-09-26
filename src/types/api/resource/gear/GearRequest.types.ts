import { IPaging } from "../../Default.types";

export interface IGetGearRequest {
  Id: string
}

export interface IGetGearListRequest extends IPaging {}

export interface IGetGearTranslationListRequest {
  GearId: string
}

export interface IGearPayload {
  Id?: string
  ResourceKey: string
  Icon: string | null
}

export interface IDeleteGearRequest {
  Id: string
}

export interface IGearTranslationPayload {
  Id: string
  Name: string
  Description: string | null
  LanguageCode: string
}

export interface IDeleteGearTranslationRequest {
  Id: string
}
