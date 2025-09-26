import BaseService from '@/services/BaseService'
import * as AI from '@/types/api/resource/ai'

export default class AIServices extends BaseService {
  DiscoverTravelPoint(payload: AI.IDiscoverTravelPointRequest) {
    return this.POST<AI.IDiscoverTravelPointResponse[]>(this.PATHS.DISCOVER_TRAVEL_POINT, payload)
  }

  TravelPointsSummary(payload: AI.ITravelPointsSummaryRequest) {
    return this.POST<AI.ITravelPointsSummaryResponse[]>(this.PATHS.TRAVEL_POINTS_SUMMARY, payload)
  }
}