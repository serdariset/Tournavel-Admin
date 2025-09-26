import { COOKIE_NAMES, COOKIE_VALUES } from '@/types/config/IStorage'
import Cookies from 'js-cookie';
type CookieOptions = Cookies.CookieAttributes;
/**
 * Cookie değerini alır
 * @param name Cookie adı
 * @returns Cookie değeri veya null
 */
export const GetCookie = (name: COOKIE_NAMES): string | null => {
  return Cookies.get(name) || null
}

/**
 * Cookie oluşturur veya günceller
 * @param name Cookie adı
 * @param value Cookie değeri
 * @param options Cookie seçenekleri
 */
export const SetCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const defaultOptions: CookieOptions = {
    path: '/',

  };

  const finalOptions = { ...defaultOptions, ...options };

  Cookies.set(name, value, finalOptions);
};

/**
 * Cookie siler
 * @param name Cookie adı
 * @param options Cookie seçenekleri (path ve domain gerekli olabilir)
 */
export const DeleteCookie = (
  name: string,
  options: CookieOptions = {}
): void => {
  options.path =  '/';
  SetCookie(name, '', {
    ...options,
    expires: new Date(0),
  })
}

/**
 * Tüm cookie'leri listeler
 * @returns Cookie adlarının dizisi
 */
export const GetAllCookies = (): string[] => {
  return document.cookie
    .split(';')
    .map((cookie) => {
      return cookie.trim().split('=')[0]
    })
    .filter((name) => name.length > 0)
}

/**
 * Belirli bir cookie'nin var olup olmadığını kontrol eder
 * @param name Cookie adı
 * @returns Cookie var mı?
 */
export const HasCookie = (name: COOKIE_NAMES): boolean => {
  return GetCookie(name) !== null
}

/**
 * Cookie değerini JSON olarak parse eder
 * @param name Cookie adı
 * @returns Parse edilmiş değer veya null
 */
export const GetCookieAsJSON = <T>(name: COOKIE_NAMES): T | null => {
  try {
    const value = GetCookie(name)
    return value ? JSON.parse(decodeURIComponent(value)) : null
  } catch {
    return null
  }
}

/**
 * Cookie'ye JSON değeri kaydeder
 * @param name Cookie adı
 * @param value JSON değeri
 * @param options Cookie seçenekleri
 */
export const SetCookieAsJSON = <T>(
  name: COOKIE_NAMES,
  value: T,
  options: {
    expires?: Date | number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
  } = {}
): void => {
  SetCookie(name, JSON.stringify(value), options)
}
