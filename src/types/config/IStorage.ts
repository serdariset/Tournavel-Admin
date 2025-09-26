import { ILanguage } from '../static/ILanguage'

export enum COOKIE_NAMES {
  TOKEN = 'TOKEN',
  TOKEN_EXPIRY = 'TOKEN_EXPIRY',
  LANGUAGE = 'LANGUAGE',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export interface COOKIE_VALUES {
  [COOKIE_NAMES.LANGUAGE]: ILanguage | null
  [COOKIE_NAMES.TOKEN]: string | null
  [COOKIE_NAMES.TOKEN_EXPIRY]: number | null
  [COOKIE_NAMES.REFRESH_TOKEN]: string | null
}
