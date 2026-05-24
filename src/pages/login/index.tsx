import React, { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { inject, observer } from 'mobx-react'
import { Button as NutButton } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { wechatLogin } from '@/shared/services/auth.service'
import './index.scss'

const LoginPage: React.FC<{ store?: any }> = ({ store }) => {
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
      Taro.showToast({ title: '登录成功', icon: 'success', duration: 1500 })
      setTimeout(() => {
        Router.switchTab({ url: '/index/index' })
      }, 1500)
    } catch (err) {
      Taro.showToast({ title: '登录失败，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    Router.switchTab({ url: '/index/index' })
  }

  return (
    <View className="login-page">
      <NavigationHeader title="登录" />
      <View className="login-content">
        <View className="login-logo">
          <View className="login-logo-icon">📅</View>
          <Text className="login-title">预约助手</Text>
          <Text className="login-subtitle">在线预约，便捷管理</Text>
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
            微信一键登录
          </NutButton>
          <View className="login-skip" onClick={handleSkip}>
            <Text className="login-skip-text">暂不登录，先看看</Text>
          </View>
        </View>

        <View className="login-tips">
          <Text className="login-tips-text">
            登录即表示同意《用户协议》和《隐私政策》
          </Text>
        </View>
      </View>
    </View>
  )
}

export default inject('store')(observer(LoginPage))
