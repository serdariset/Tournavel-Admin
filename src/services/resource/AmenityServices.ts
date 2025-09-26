import BaseService from '@/services/BaseService'
import * as AMENITY from '@/types/api/resource/amenity'

export default class AmenityServices extends BaseService {
  GetAmenity(payload: AMENITY.IGetAmenityRequest) {
    return this.GET<AMENITY.IGetAmenityResponse[]>(this.PATHS.GET_AMENITY, payload)
  }

  GetAmenityList(payload: AMENITY.IGetAmenityListRequest) {
    return this.GET<AMENITY.IGetAmenityListResponse[]>(this.PATHS.GET_AMENITY_LIST, payload)
  }

  GetAmenityTranslationsList(payload: AMENITY.IGetAmenityTranslationListRequest) {
    return this.GET<AMENITY.IGetAmenityTranslationListResponse[]>(this.PATHS.GET_AMENITY_TRANSLATIONS, payload)
  }

  CreateAmenity(payload: AMENITY.IAmenityPayload) {
    return this.POST<boolean>(this.PATHS.CREATE_AMENITY, payload)
  }

  UpdateAmenity(payload: AMENITY.IAmenityPayload) {
    return this.PUT<boolean>(this.PATHS.UPDATE_AMENITY, payload)
  }

  DeleteAmenity(payload: AMENITY.IDeleteAmenityRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_AMENITY, null, payload)
  }

  CreateAmenityTranslation(payload: AMENITY.IAmenityTranslationPayload) {
    return this.POST<boolean>(this.PATHS.CREATE_AMENITY_TRANSLATION, payload)
  }

  UpdateAmenityTranslation(payload: AMENITY.IAmenityTranslationPayload) {
    return this.PUT<boolean>(this.PATHS.UPDATE_AMENITY_TRANSLATION, payload)
  }

  DeleteAmenityTranslation(payload: AMENITY.IDeleteAmenityTranslationRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_AMENITY_TRANSLATION, payload)
  }
}
