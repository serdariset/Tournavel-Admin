import * as API from '@/types/api'


export interface ITagStore {
  tags: API.IGetTagListResponse[]
  tag: API.IGetTagResponse[]
  tagTranslationList: API.IGetTagTranslationListResponse[]
}

export interface IAmenityStore {
  amenities: API.IGetAmenityListResponse[]
  amenity: API.IGetAmenityResponse[]
  amenityTranslationList: API.IGetAmenityTranslationListResponse[]
}

export interface IGearStore {
  gears: API.IGetGearListResponse[]
}

export interface IAIStore {
  travelPointsSummary: API.ITravelPointsSummaryResponse[]
  discoverTravelPoints: API.IDiscoverTravelPointResponse[]
}

export interface ITravelPointStore {
  travelPoints: API.IGetTravelPointListResponse[]
  travelPoint: API.IGetTravelPointResponse | null
}