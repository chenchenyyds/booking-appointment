import React from 'react'
import { View, Text } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import { switchLanguage } from '@/shared/i18n'
import './index.scss'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as 'en' | 'zh'

  const toggle = () => {
    const next = currentLang === 'zh' ? 'en' : 'zh'
    switchLanguage(next)
  }

  return (
    <View className="language-switcher" onClick={toggle}>
      <Text className="language-switcher-text">
        {currentLang === 'zh' ? 'EN' : '中文'}
      </Text>
    </View>
  )
}

export default LanguageSwitcher
