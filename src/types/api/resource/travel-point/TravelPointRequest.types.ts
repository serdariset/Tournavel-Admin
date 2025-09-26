import { IPaging } from '../../Default.types'

export interface IGetTravelPointRequest {
  Id: string
  IncludeRelations?: boolean
}

export interface IGetTravelPointListRequest extends IPaging {
  SearchTerm?: string
  IsActive?: boolean
  IsDeleted?: boolean
}

export interface ITravelPointPayload {
  Id?: string
  Latitude: number
  Longitude: number
  CountryId: string
  CityId: string
  Address: string | null
  Website: string | null
  PhoneNumber: string | null
  IsTemporarilyClosed: boolean
  IsVerified: boolean
  CoverImageUrl: string | null
}

export interface IDeleteTravelPointRequest {
  Id: string
}
