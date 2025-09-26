import { IGearStore } from "@/types/api/Stores"
import * as GEAR from '@/types/api/resource/gear'
import { ResourceAPI } from '@/services'
import { defineStore } from 'pinia'



export const useGearStore = defineStore('gear', {
  state: (): IGearStore => ({
    gears: [],
  }),

  actions: {
    async GetGearList(payload: GEAR.IGetGearListRequest) {
      const { Data, Status } = await ResourceAPI.Gear.GetGearList(payload)
      this.gears = Status ? Data : []

      return Status
    },

    async CreateGear(payload: GEAR.IGearPayload) {
      const { Status } = await ResourceAPI.Gear.CreateGear(payload)
      return Status
    },

    async UpdateGear(payload: GEAR.IGearPayload) {
      const { Status } = await ResourceAPI.Gear.UpdateGear(payload)
      return Status
    },

    async DeleteGear(payload: GEAR.IDeleteGearRequest) {
      const { Status } = await ResourceAPI.Gear.DeleteGear(payload)

      return Status
    },

    async CreateGearTranslation(payload: GEAR.IGearTranslationPayload) {
      const { Status } = await ResourceAPI.Gear.CreateGearTranslation(payload)
      return Status
    },

    async UpdateGearTranslation(payload: GEAR.IGearTranslationPayload) {
      const { Status } = await ResourceAPI.Gear.UpdateGearTranslation(payload)
      return Status
    },

    async DeleteGearTranslation(payload: GEAR.IDeleteGearTranslationRequest) {
      const { Status } = await ResourceAPI.Gear.DeleteGearTranslation(payload)
      return Status
    }

  }
})