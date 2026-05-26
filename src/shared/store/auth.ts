import Taro from '@tarojs/taro'
import { observable } from 'mobx'

interface UserInfo {
  nickName: string
  avatarUrl: string
  phoneNumber: string
}

interface AuthStore {
  isLoggedIn: boolean
  token: string | null
  openid: string | null
  userInfo: UserInfo | null
  setToken: (token: string) => void
  setOpenid: (openid: string) => void
  setUserInfo: (userInfo: UserInfo) => void
  login: (token: string, openid: string, userInfo: UserInfo) => void
  logout: () => void
  checkLogin: () => boolean
}

// Read initial state from storage (survives page reload)
function readInitialState() {
  return {
    isLoggedIn: !!Taro.getStorageSync('auth_token'),
    token: Taro.getStorageSync('auth_token') || null,
    openid: Taro.getStorageSync('auth_openid') || null,
    userInfo: parseUserInfo(),
  }
}

function parseUserInfo(): UserInfo | null {
  try {
    const raw = Taro.getStorageSync('auth_userInfo')
    return raw || null
  } catch {
    return null
  }
}

const authStore = observable<AuthStore>({
  ...readInitialState(),

  setToken(token: string) {
    Taro.setStorageSync('auth_token', token)
    this.token = token
  },

  setOpenid(openid: string) {
    Taro.setStorageSync('auth_openid', openid)
    this.openid = openid
  },

  setUserInfo(userInfo: UserInfo) {
    Taro.setStorageSync('auth_userInfo', userInfo)
    this.userInfo = userInfo
  },

  login(token: string, openid: string, userInfo: UserInfo) {
    this.setToken(token)
    this.setOpenid(openid)
    this.setUserInfo(userInfo)
    this.isLoggedIn = true
  },

  logout() {
    Taro.removeStorageSync('auth_token')
    Taro.removeStorageSync('auth_openid')
    Taro.removeStorageSync('auth_userInfo')
    this.isLoggedIn = false
    this.token = null
    this.openid = null
    this.userInfo = null
  },

  checkLogin(): boolean {
    // Re-read from storage every time in case state was mutated externally
    return !!Taro.getStorageSync('auth_token')
  },
})

export default authStore
