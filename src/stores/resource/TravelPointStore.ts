import { ITravelPointStore } from '@/types/api/Stores'
import * as TRAVEL_POINT from '@/types/api/resource/travel-point'
import { ResourceAPI } from '@/services'
import { defineStore } from 'pinia'

export const useTravelPointStore = defineStore('travel-point', {
  state: (): ITravelPointStore => ({
    travelPoints: [],
    travelPoint: null,
  }),

  actions: {
    async GetTravelPointList(payload: TRAVEL_POINT.IGetTravelPointListRequest) {
      const { Data, Status } = await ResourceAPI.TravelPoint.GetTravelPointList(payload)
      this.travelPoints = Status ? Data : []

      return Status
    },

    async GetTravelPoint(payload: TRAVEL_POINT.IGetTravelPointRequest) {
      const { Data, Status } = await ResourceAPI.TravelPoint.GetTravelPoint(payload)
      this.travelPoint = Status ? Data : null

      return Status
    },

    async CreateTravelPoint(payload: TRAVEL_POINT.ITravelPointPayload) {
      const { Status } = await ResourceAPI.TravelPoint.CreateTravelPoint(payload)
      return Status
    },

    async UpdateTravelPoint(payload: TRAVEL_POINT.ITravelPointPayload) {
      const { Status } = await ResourceAPI.TravelPoint.UpdateTravelPoint(payload)
      return Status
    },

    async DeleteTravelPoint(payload: TRAVEL_POINT.IDeleteTravelPointRequest) {
      const { Status } = await ResourceAPI.TravelPoint.DeleteTravelPoint(payload)
      return Status
    },
  },
})
