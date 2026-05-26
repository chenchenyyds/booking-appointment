import Taro from '@tarojs/taro'

export interface LoginResult {
  token: string
  openid: string
  nickName: string
  avatarUrl: string
  phoneNumber: string
}

// In real production, the code should be sent to YOUR backend,
// which calls https://api.weixin.qq.com/sns/jscode2session to exchange for openid.
// Here in dev, we use the code itself as the openid identifier.
async function getOpenidFromCode(code: string): Promise<string> {
  // In production: POST code to backend → backend calls code2Session → returns openid
  return `wx_${code.slice(0, 16)}`
}

export async function wechatLogin(): Promise<LoginResult> {
  // Step 1: wx.login() — get temporary code (REAL WeChat API)
  const loginRes = await Taro.login()
  if (!loginRes.code) {
    throw new Error('wx.login() failed: no code returned')
  }

  // Step 2: Exchange code for openid
  // In production: POST to your backend. Here we use code as identifier.
  const openid = await getOpenidFromCode(loginRes.code)
  const token = `token_${openid}_${Date.now()}`

  // Step 3: Get user profile (REAL WeChat API)
  let nickName = '微信用户'
  let avatarUrl = ''
  try {
    const profileRes = await Taro.getUserProfile({
      desc: '用于展示用户信息',
    })
    if (profileRes.userInfo) {
      nickName = profileRes.userInfo.nickName || nickName
      avatarUrl = profileRes.userInfo.avatarUrl || avatarUrl
    }
  } catch (_) {
    // getUserProfile may fail on newer SDK or if user denies
    // Fall through with default nickname
  }

  return {
    token,
    openid,
    nickName,
    avatarUrl,
    phoneNumber: '', // Requires <button open-type="getPhoneNumber"> separately
  }
}
