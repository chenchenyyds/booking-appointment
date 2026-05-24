import Taro from '@tarojs/taro'
import { observable } from 'mobx'

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  openid: string | null
  userInfo: {
    nickName: string
    avatarUrl: string
    phoneNumber: string
  } | null
}

const authStore = observable<AuthState>({
  isLoggedIn: false,
  token: null,
  openid: null,
  userInfo: null,

  get isLoggedIn() {
    const token = Taro.getStorageSync('auth_token')
    return !!token
  },

  get token() {
    return Taro.getStorageSync('auth_token') || null
  },

  get openid() {
    return Taro.getStorageSync('auth_openid') || null
  },

  get userInfo() {
    try {
      return Taro.getStorageSync('auth_userInfo') || null
    } catch {
      return null
    }
  },

  setToken(token: string) {
    Taro.setStorageSync('auth_token', token)
    Object.assign(this, { token })
  },

  setOpenid(openid: string) {
    Taro.setStorageSync('auth_openid', openid)
    Object.assign(this, { openid })
  },

  setUserInfo(userInfo: AuthState['userInfo']) {
    Taro.setStorageSync('auth_userInfo', userInfo)
    Object.assign(this, { userInfo })
  },

  login(token: string, openid: string, userInfo: AuthState['userInfo']) {
    this.setToken(token)
    this.setOpenid(openid)
    this.setUserInfo(userInfo)
    Object.assign(this, { isLoggedIn: true })
  },

  logout() {
    Taro.removeStorageSync('auth_token')
    Taro.removeStorageSync('auth_openid')
    Taro.removeStorageSync('auth_userInfo')
    Object.assign(this, {
      isLoggedIn: false,
      token: null,
      openid: null,
      userInfo: null,
    })
  },

  checkLogin(): boolean {
    return !!this.token
  },
})

export default authStore
