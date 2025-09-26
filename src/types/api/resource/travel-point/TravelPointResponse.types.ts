export interface IGetTravelPointResponse {
  Id: string
  Name: string
  Description: string | null
  TranslationId: string | null
  Latitude: number
  Longitude: number
  CountryId: string
  CityId: string
  Address: string | null
  Website: string | null
  PhoneNumber: string | null
  AverageRating: number
  RatingCount: number
  ViewCount: number
  IsTemporarilyClosed: boolean
  IsVerified: boolean
  CoverImageUrl: string | null
  Tags: TagResponse[]
  Amenities: AmenityResponse[]
  Activities: TravelPointActivityResponse[]
  Infos: PointInfoDefinitionResponse[]
  PricingTiers: PricingTierResponse[]
  Availabilities: AvailabilityRuleResponse[]
}

interface ITranslation {
  Name: string
  Description: string | null
  TranslationId?: string
}

export interface TagResponse extends ITranslation {
  Id: string
  ResourceKey: string
  ColorHex: string | null
  Icon: string | null
  IsFeatured: boolean
}

export interface AmenityResponse extends ITranslation {
  Id: string
  ResourceKey: string
  Icon: string | null
}

export interface TravelPointActivityResponse extends ITranslation {
  Id: string
  EstimatedDuration: number | null
  DifficultyLevel: number | null
  ResourceKey: string
  Icon: string | null
  IsBookingRequired: boolean
  MinAge: number | null
  MaxAge: number | null
  ActivityDefinitionId: string
  Gears: IGearResponse[]
  AvailabilityRules: AvailabilityRuleResponse[]
}

export interface IGearResponse extends ITranslation {
  Id: string
  Icon: string | null
  ResourceKey: string
}

export interface AvailabilityRuleResponse {
  Id: string
  OwnerType: number
  Hemisphere: number
  ApplicableClimateZones: number[] | null
  StartDate: Date
  EndDate: Date
  StartTime: string | null
  EndTime: string | null
  AvailableDaysOfWeek: number[] | null
  Description: string | null
}

export interface PointInfoDefinitionResponse extends ITranslation {
  Id: string
  ResourceKey: string
  Type: number
  Icon: string | null
  ColorHex: string | null
}

export interface PricingTierResponse extends ITranslation {
  Id: string
  Currency: string
  Price: number
}

export interface IGetTravelPointListResponse {
  Id: string
  Name: string
  Description: string | null
  Latitude: number
  Longitude: number
  CountryId: string
  CityId: string
  Address: string | null
  Website: string | null
  PhoneNumber: string | null
  AverageRating: number
  RatingCount: number
  ViewCount: number
  IsTemporarilyClosed: boolean
  IsVerified: boolean
  CoverImageUrl: string | null
}