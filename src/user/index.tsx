import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { Button, Avatar } from '@nutui/nutui-react-taro'
import PageContainer from '@/components/page_container'
import LanguageSwitcher from '@/components/language-switcher'
import Router from '@/utils/route'

import './index.scss'

const UserIndex: React.FC<{ store?: any }> = ({ store }) => {
  const { t } = useTranslation()
  const { auth } = store
  const isLoggedIn = auth.isLoggedIn
  const userInfo = auth.userInfo

  const handleLogin = () => {
    Router.navigateTo({ url: '/pages/login/index' })
  }

  const handleLogout = () => {
    Taro.showModal({
      title: t('common.confirm'),
      content: t('user.logoutConfirm'),
      success: (res) => {
        if (res.confirm) {
          auth.logout()
          Taro.showToast({ title: t('user.logoutSuccess'), icon: 'success' })
        }
      },
    })
  }

  const handleMyOrders = () => {
    if (!isLoggedIn) {
      handleLogin()
      return
    }
    Router.navigateTo({ url: '/orders/index' })
  }

  return (
    <PageContainer title={t('user.title')} containerClass="user-index-page">
      <LanguageSwitcher />
      <View className="user-content">
        <View className="user-profile-card">
          {isLoggedIn && userInfo ? (
            <>
              <Avatar size="large" src={userInfo.avatarUrl} />
              <Text className="user-nickname">{userInfo.nickName}</Text>
              <Text className="user-phone">{userInfo.phoneNumber}</Text>
            </>
          ) : (
            <>
              <View className="user-avatar-placeholder">
                <Avatar size="large" />
              </View>
              <Text className="user-nickname">{t('user.notLoggedIn')}</Text>
              <Text className="user-login-hint" onClick={handleLogin}>
                {t('user.loginHint')}
              </Text>
            </>
          )}
        </View>

        <View className="user-menu">
          <View className="user-menu-item" onClick={handleMyOrders}>
            <Text className="user-menu-icon">📋</Text>
            <Text className="user-menu-label">{t('user.myOrders')}</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
          <View className="user-menu-item">
            <Text className="user-menu-icon">🔔</Text>
            <Text className="user-menu-label">{t('user.notifications')}</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
          <View className="user-menu-item">
            <Text className="user-menu-icon">⚙️</Text>
            <Text className="user-menu-label">{t('user.settings')}</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
        </View>

        <View className="user-actions">
          {isLoggedIn ? (
            <Button block size="large" onClick={handleLogout} className="user-logout-btn">
              {t('user.logout')}
            </Button>
          ) : (
            <Button
              block
              size="large"
              type="primary"
              onClick={handleLogin}
              className="user-login-btn"
            >
              {t('user.login')}
            </Button>
          )}
        </View>
      </View>
    </PageContainer>
  )
}

export default inject('store')(observer(UserIndex))
