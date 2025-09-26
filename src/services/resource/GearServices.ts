import BaseService from '@/services/BaseService'
import * as GEAR from '@/types/api/resource/gear'

export default class GearServices extends BaseService {
  GetGearList(payload: GEAR.IGetGearListRequest) {
    return this.GET<GEAR.IGetGearListResponse[]>(this.PATHS.GET_GEAR_LIST, payload)
  }

  CreateGear(payload: GEAR.IGearPayload) {
    return this.POST<boolean>(this.PATHS.CREATE_GEAR, payload)
  }

  UpdateGear(payload: GEAR.IGearPayload) {
    return this.PUT<boolean>(this.PATHS.UPDATE_GEAR, payload)
  }

  DeleteGear(payload: GEAR.IDeleteGearRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_GEAR, null, payload)
  }

  CreateGearTranslation(payload: GEAR.IGearTranslationPayload) {
    return this.POST<boolean>(this.PATHS.CREATE_GEAR_TRANSLATION, payload)
  }

  UpdateGearTranslation(payload: GEAR.IGearTranslationPayload) {
    return this.PUT<boolean>(this.PATHS.UPDATE_GEAR_TRANSLATION, payload)
  }

  DeleteGearTranslation(payload: GEAR.IDeleteGearTranslationRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_GEAR_TRANSLATION, payload)
  }
}