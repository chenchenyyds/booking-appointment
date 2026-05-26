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
    if (loginRes.code) {
      // Mock backend token exchange
      const userInfo = MOCK_USERS[loginRes.code] || MOCK_USERS.test_code_001 || {
        nickName: 'Demo User',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/2.png',
        phoneNumber: '139****9999',
      }
      const openid = `wx_openid_${Date.now()}`
      return { token: `wx_token_${openid}`, openid, ...userInfo }
    }
  } catch (_) {
    // Not in WeChat environment — fall through to mock login
  }

  // Fallback: mock login for dev / H5 preview
  const fallbackUser = MOCK_USERS.test_code_001 || {
    nickName: 'Demo User',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
    phoneNumber: '138****8888',
  }
  const openid = `dev_openid_${Date.now()}`
  const token = `dev_token_${openid}`
  return { token, openid, ...fallbackUser }
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
