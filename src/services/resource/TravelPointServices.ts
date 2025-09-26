import BaseService from '@/services/BaseService'
import * as TRAVEL_POINT from '@/types/api/resource/travel-point'

export default class TravelPointServices extends BaseService {
  GetTravelPoint(payload: TRAVEL_POINT.IGetTravelPointRequest) {
    return this.GET<TRAVEL_POINT.IGetTravelPointResponse>(this.PATHS.GET_TRAVEL_POINT, payload)
  }

  GetTravelPointList(payload: TRAVEL_POINT.IGetTravelPointListRequest) {
    return this.GET<TRAVEL_POINT.IGetTravelPointListResponse[]>(this.PATHS.GET_TRAVEL_POINT_LIST, payload)
  }

  CreateTravelPoint(payload: TRAVEL_POINT.ITravelPointPayload) {
    return this.POST<boolean>(this.PATHS.CREATE_TRAVEL_POINT, payload)
  }

  UpdateTravelPoint(payload: TRAVEL_POINT.ITravelPointPayload) {
    return this.PUT<boolean>(this.PATHS.UPDATE_TRAVEL_POINT, payload)
  }

  DeleteTravelPoint(payload: TRAVEL_POINT.IDeleteTravelPointRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_TRAVEL_POINT, null, payload)
  }

}