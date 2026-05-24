import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Taro from '@tarojs/taro'

import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

const getSavedLanguage = (): 'en' | 'zh' => {
  const saved = Taro.getStorageSync('language')
  if (saved === 'en' || saved === 'zh') return saved
  return 'zh'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
})

export function switchLanguage(lang: 'en' | 'zh') {
  Taro.setStorageSync('language', lang)
  i18n.changeLanguage(lang)
}

export default i18n
