import { IAmenityStore } from '@/types/api/Stores'
import * as AMENITY from '@/types/api/resource/amenity'
import { ResourceAPI } from '@/services'

export const useAmenityStore = defineStore('amenity', {
  state: (): IAmenityStore => ({
    amenities: [],
    amenity: [],
    amenityTranslationList: [],
  }),

  actions: {
    async GetAmenity(payload: AMENITY.IGetAmenityRequest) {
      const { Data, Status } = await ResourceAPI.Amenity.GetAmenity(payload)
      this.amenity = Status ? Data : []

      return Status
    },

    async GetAmenityList(payload: AMENITY.IGetAmenityListRequest) {
      const { Data, Status } = await ResourceAPI.Amenity.GetAmenityList(payload)
      this.amenities = Status ? Data : []

      return Status
    },

    async CreateAmenity(payload: AMENITY.IAmenityPayload) {
      const { Data, Status } = await ResourceAPI.Amenity.CreateAmenity(payload)
      return Status
    },

    async UpdateAmenity(payload: AMENITY.IAmenityPayload) {
      const { Data, Status } = await ResourceAPI.Amenity.UpdateAmenity(payload)
      return Status
    },

    async DeleteAmenity(payload: AMENITY.IDeleteAmenityRequest) {
      const { Data, Status } = await ResourceAPI.Amenity.DeleteAmenity(payload)
      return Status
    },

    async GetAmenityTranslationList(payload: AMENITY.IGetAmenityTranslationListRequest) {
      const { Data, Status } = await ResourceAPI.Amenity.GetAmenityTranslationsList(payload)
      this.amenityTranslationList = Status ? Data : []

      return Status
    },

    async CreateAmenityTranslation(payload: AMENITY.IAmenityTranslationPayload) {
      const { Data, Status } = await ResourceAPI.Amenity.CreateAmenityTranslation(payload)
      return Status
    },

    async UpdateAmenityTranslation(payload: AMENITY.IAmenityTranslationPayload) {
      const { Data, Status } = await ResourceAPI.Amenity.UpdateAmenityTranslation(payload)
      return Status
    },

    async DeleteAmenityTranslation(payload: AMENITY.IDeleteAmenityTranslationRequest) {
      const { Data, Status } = await ResourceAPI.Amenity.DeleteAmenityTranslation(payload)
      return Status
    },
  },
})
