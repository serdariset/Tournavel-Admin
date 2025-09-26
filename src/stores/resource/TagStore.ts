import { defineStore } from 'pinia'
import * as TAG from '@/types/api/resource/tag'
import { ResourceAPI } from '@/services'
import { ITagStore } from '@/types/api/Stores'

export const useTagStore = defineStore('tag', {
  state: (): ITagStore => ({
    tags: [],
    tag: [],
    tagTranslationList: [],
  }),

  actions: {
    async GetTag(payload: TAG.IGetTagRequest) {
      const { Data, Status } = await ResourceAPI.Tag.GetTag(payload)

      this.tag = Status ? Data : []

      return Status
    },

    async GetTagList(payload: TAG.IGetTagListRequest) {
      const { Data, Status } = await ResourceAPI.Tag.GetTagList(payload)

      this.tags = Status ? Data : []

      return Status
    },

    async CreateTag(payload: TAG.ICreateTagRequest) {
      const { Data, Status } = await ResourceAPI.Tag.CreateTag(payload)
      return Status
    },

    async UpdateTag(payload: TAG.IUpdateTagRequest) {
      const { Data, Status } = await ResourceAPI.Tag.UpdateTag(payload)
      return Status
    },

    async DeleteTag(payload: TAG.IDeleteTagRequest) {
      const { Status } = await ResourceAPI.Tag.DeleteTag(payload)

      if (Status) {
        this.tags = this.tags.filter((tag) => tag.Id !== payload.Id)
      }

      return Status
    },

    async GetTagTranslationsList(payload: TAG.IGetTagTranslationListRequest) {
      const { Data, Status } = await ResourceAPI.Tag.GetTagTranslationsList(payload)
      this.tagTranslationList = Status ? Data : []

      return Status
    },

    async CreateTagTranslation(payload: TAG.ICreateTagTranslationRequest) {
      const { Data, Status } = await ResourceAPI.Tag.CreateTagTranslation(payload)
      return Status
    },

    async UpdateTagTranslation(payload: TAG.IUpdateTagTranslationRequest) {
      const { Data, Status } = await ResourceAPI.Tag.UpdateTagTranslation(payload)
      return Status
    },

    async DeleteTagTranslation(payload: TAG.IDeleteTagTranslationRequest) {
      const { Status } = await ResourceAPI.Tag.DeleteTagTranslation(payload)

      if (Status) {
        this.tagTranslationList = this.tagTranslationList.filter(
          (translation) => translation.Id !== payload.Id
        )
      }

      return Status
    },
  },
})
