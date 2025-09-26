export interface IDiscoverTravelPointRequest {
  Tag: string
  Country: string
  City: string
}

export interface ITravelPointsSummaryRequest {
  Country: string
  City: string
  Tags: string[]
}