import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { inject, observer } from 'mobx-react'
import { Button, Avatar } from '@nutui/nutui-react-taro'
import PageContainer from '@/shared/components/page_container'
import Router from '@/shared/utils/route'

import './index.scss'

const UserIndex: React.FC<{ store?: any }> = ({ store }) => {
  const { auth } = store
  const isLoggedIn = auth.checkLogin()
  const userInfo = auth.userInfo

  const handleLogin = () => {
    Router.navigateTo({ url: '/login/index' })
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          auth.logout()
          Taro.showToast({ title: '已退出登录', icon: 'success' })
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
    <PageContainer title="个人中心" containerClass="user-index-page">
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
              <Text className="user-nickname">未登录</Text>
              <Text className="user-login-hint" onClick={handleLogin}>
                点击登录，体验更多功能
              </Text>
            </>
          )}
        </View>

        <View className="user-menu">
          <View className="user-menu-item" onClick={handleMyOrders}>
            <Text className="user-menu-icon">📋</Text>
            <Text className="user-menu-label">我的预约</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
          <View className="user-menu-item">
            <Text className="user-menu-icon">🔔</Text>
            <Text className="user-menu-label">消息通知</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
          <View className="user-menu-item">
            <Text className="user-menu-icon">⚙️</Text>
            <Text className="user-menu-label">设置</Text>
            <Text className="user-menu-arrow">&gt;</Text>
          </View>
        </View>

        <View className="user-actions">
          {isLoggedIn ? (
            <Button block size="large" onClick={handleLogout} className="user-logout-btn">
              退出登录
            </Button>
          ) : (
            <Button
              block
              size="large"
              type="primary"
              onClick={handleLogin}
              className="user-login-btn"
            >
              立即登录
            </Button>
          )}
        </View>
      </View>
    </PageContainer>
  )
}

export default inject('store')(observer(UserIndex))
