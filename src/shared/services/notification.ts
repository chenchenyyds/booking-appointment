import Taro from '@tarojs/taro'

// WeChat template message IDs (replace with real template IDs in production)
const TEMPLATE_IDS = {
  bookingConfirm: 'TEMPLATE_BOOKING_CONFIRM',
  bookingReminder: 'TEMPLATE_BOOKING_REMINDER',
}

export async function requestSubscribeMessage(
  tmplIds: string[] = Object.values(TEMPLATE_IDS)
): Promise<boolean> {
  try {
    if (process.env.TARO_ENV === 'weapp') {
      const res = await Taro.requestSubscribeMessage({ tmplIds })
      const accepted = tmplIds.some((id) => res[id] === 'accept')
      return accepted
    }
    // Non-WeChat env: simulate success
    return true
  } catch (err) {
    console.warn('Subscribe message failed:', err)
    return false
  }
}

export function showSubscribePrompt(
  title: string,
  content: string,
  confirmText: string,
  cancelText: string,
  afterAction: () => void
) {
  Taro.showModal({
    title,
    content,
    confirmText,
    cancelText,
    success: async (res) => {
      if (res.confirm) {
        await requestSubscribeMessage()
      }
      afterAction()
    },
  })
}

export { TEMPLATE_IDS }
