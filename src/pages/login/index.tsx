import React, { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { inject, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button as NutButton } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/components/navigation_header'
import Router from '@/utils/route'
import { wechatLogin } from '@/services/auth.service'
import './index.scss'

const LoginPage: React.FC<{ store?: any }> = ({ store }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleWechatLogin = async () => {
    setLoading(true)
    try {
      const result = await wechatLogin()
      store.auth.login(result.token, result.openid, {
        nickName: result.nickName,
        avatarUrl: result.avatarUrl,
        phoneNumber: result.phoneNumber,
      })
      Taro.showToast({ title: t('login.success'), icon: 'success', duration: 1500 })
      setTimeout(() => {
        Router.switchTab({ url: '/index/index' })
      }, 1500)
    } catch (err) {
      Taro.showToast({ title: t('login.fail'), icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    Router.switchTab({ url: '/index/index' })
  }

  return (
    <View className="login-page">
      <NavigationHeader title={t('login.title')} />
      <View className="login-content">
        <View className="login-logo">
          <View className="login-logo-icon">📅</View>
          <Text className="login-title">{t('app.name')}</Text>
          <Text className="login-subtitle">{t('app.subtitle')}</Text>
        </View>

        <View className="login-actions">
          <NutButton
            type="primary"
            size="large"
            block
            loading={loading}
            className="login-btn-wechat"
            onClick={handleWechatLogin}
          >
            {t('login.wechatLogin')}
          </NutButton>
          <View className="login-skip" onClick={handleSkip}>
            <Text className="login-skip-text">{t('login.skip')}</Text>
          </View>
        </View>

        <View className="login-tips">
          <Text className="login-tips-text">
            {t('login.agreement')}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default inject('store')(observer(LoginPage))
