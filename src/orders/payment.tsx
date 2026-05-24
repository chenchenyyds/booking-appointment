import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import { Button as NutButton, Dialog } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { mockOrders } from '@/shared/mock/orders'
import './payment.scss'

const PaymentPage: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { orderId, amount } = router.params
  const [paying, setPaying] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setPaySuccess(true)
      setShowResult(true)

      const order = mockOrders.find((o) => o.id === orderId)
      if (order && order.status === 'pending') {
        order.status = 'confirmed'
      }
    }, 2000)
  }

  const handleResultConfirm = () => {
    setShowResult(false)
    if (paySuccess) {
      Router.switchTab({ url: '/user/index' })
    }
  }

  const handleCancel = () => {
    Router.navigateBack()
  }

  return (
    <View className="payment-page">
      <NavigationHeader title={t('payment.title')} />
      <View className="payment-content">
        <View className="payment-card">
          <View className="payment-amount-section">
            <Text className="payment-label">{t('payment.amount')}</Text>
            <View className="payment-amount">
              <Text className="payment-currency">¥</Text>
              <Text className="payment-value">{amount}</Text>
            </View>
          </View>

          <View className="payment-info-section">
            <View className="payment-info-row">
              <Text className="payment-info-label">{t('orders.orderId')}</Text>
              <Text className="payment-info-value">{orderId}</Text>
            </View>
            <View className="payment-info-row">
              <Text className="payment-info-label">{t('payment.method')}</Text>
              <Text className="payment-info-value">{t('payment.wechatPay')}</Text>
            </View>
          </View>
        </View>

        <View className="payment-methods">
          <View className="payment-method-item active">
            <Text className="payment-method-icon">💚</Text>
            <Text className="payment-method-name">{t('payment.wechatPay')}</Text>
            <View className="payment-method-check" />
          </View>
        </View>
      </View>

      <View className="payment-bottom-bar">
        <NutButton onClick={handleCancel} className="payment-btn-cancel">
          {t('common.cancel')}
        </NutButton>
        <NutButton
          type="primary"
          loading={paying}
          onClick={handlePay}
          className="payment-btn-confirm"
        >
          {t('payment.confirmPay')} ¥{amount}
        </NutButton>
      </View>

      <Dialog
        visible={showResult}
        title={paySuccess ? t('payment.success') : t('payment.fail')}
        onConfirm={handleResultConfirm}
        hideCancelButton
      >
        {paySuccess ? t('payment.successMsg') : t('payment.failMsg')}
      </Dialog>
    </View>
  )
}

export default PaymentPage
