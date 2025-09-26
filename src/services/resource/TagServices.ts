import BaseService from '@/services/BaseService'
import * as TAG from '@/types/api/resource/tag'



export default class TagServices extends BaseService {
  
  GetTag(payload: TAG.IGetTagRequest) {
    return this.GET<TAG.IGetTagResponse[]>(this.PATHS.GET_TAG, payload)
  }

  GetTagList(payload: TAG.IGetTagListRequest) {
    return this.GET<TAG.IGetTagListResponse[]>(this.PATHS.GET_TAG_LIST, payload)
  }

  GetTagTranslationsList(payload: TAG.IGetTagTranslationListRequest) {
    return this.GET<TAG.IGetTagTranslationListResponse[]>(this.PATHS.GET_TAG_TRANSLATIONS, payload)
  }

  CreateTag(payload: TAG.ICreateTagRequest) {
    return this.POST<boolean>(this.PATHS.CREATE_TAG, payload)
  }

  UpdateTag(payload: TAG.IUpdateTagRequest) {
    return this.PUT<boolean>(this.PATHS.UPDATE_TAG, payload)
  }

  DeleteTag(payload: TAG.IDeleteTagRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_TAG, null, payload)
  }

  CreateTagTranslation(payload: TAG.ICreateTagTranslationRequest) {
    return this.POST<boolean>(this.PATHS.CREATE_TAG_TRANSLATION, payload)
  }

  UpdateTagTranslation(payload: TAG.IUpdateTagTranslationRequest) {
    return this.PUT<boolean>(this.PATHS.UPDATE_TAG_TRANSLATION, payload)
  }

  DeleteTagTranslation(payload: TAG.IDeleteTagTranslationRequest) {
    return this.DELETE<boolean>(this.PATHS.DELETE_TAG_TRANSLATION, payload)
  }
}
