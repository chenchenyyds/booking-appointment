import Taro from '@tarojs/taro'

const MOCK_USERS: Record<string, { nickName: string; avatarUrl: string; phoneNumber: string }> = {
  test_code_001: {
    nickName: 'Demo User',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
    phoneNumber: '138****8888',
  },
}

export interface LoginResult {
  token: string
  openid: string
  nickName: string
  avatarUrl: string
  phoneNumber: string
}

export async function wechatLogin(): Promise<LoginResult> {
  try {
    const loginRes = await Taro.login()
    if (!loginRes.code) {
      throw new Error('WeChat login failed: no code returned')
    }

    // Mock backend token exchange
    // In production: POST code to your backend, backend calls code2Session
    const userInfo = MOCK_USERS[loginRes.code] || {
      nickName: '新用户',
      avatarUrl: 'https://api.slingacademy.com/public/sample-users/2.png',
      phoneNumber: '139****9999',
    }

    const openid = `mock_openid_${Date.now()}`
    const token = `mock_token_${openid}_${Date.now()}`

    return {
      token,
      openid,
      ...userInfo,
    }
  } catch (e) {
    console.error('WeChat login error:', e)
    throw e
  }
}

export async function getUserProfile(): Promise<{
  nickName: string
  avatarUrl: string
  phoneNumber: string
}> {
  // In production: call backend with token to fetch user profile
  return {
    nickName: 'Demo User',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
    phoneNumber: '138****8888',
  }
}
