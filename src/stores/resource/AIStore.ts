import { ResourceAPI } from '@/services'
import { defineStore } from 'pinia'
import { IAIStore } from '@/types/api/Stores'
import * as AI from '@/types/api/resource/ai'

export const useAIStore = defineStore('AIStore', {
  state: (): IAIStore => ({
    travelPointsSummary: [],
    discoverTravelPoints: [],
  }),

  actions: {
    async DiscoverTravelPoint(payload: AI.IDiscoverTravelPointRequest) {
      const { Data, Status } = await ResourceAPI.AI.DiscoverTravelPoint(payload)
      this.discoverTravelPoints = Status ? Data : []

      return Status
    },

    async TravelPointsSummary(payload: AI.ITravelPointsSummaryRequest) {
      const { Data, Status } = await ResourceAPI.AI.TravelPointsSummary(payload)
      this.travelPointsSummary = Status ? Data : []

      return Status
    },
  },
})
