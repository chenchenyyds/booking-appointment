import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Button as NutButton, Dialog } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { mockOrders } from '@/shared/mock/orders'
import './payment.scss'

const PaymentPage: React.FC = () => {
  const router = useRouter()
  const { orderId, amount } = router.params
  const [paying, setPaying] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  const handlePay = () => {
    setPaying(true)
    // Mock payment process
    setTimeout(() => {
      setPaying(false)
      setPaySuccess(true)
      setShowResult(true)

      // Update order status
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
      <NavigationHeader title="确认支付" />
      <View className="payment-content">
        <View className="payment-card">
          <View className="payment-amount-section">
            <Text className="payment-label">支付金额</Text>
            <View className="payment-amount">
              <Text className="payment-currency">¥</Text>
              <Text className="payment-value">{amount}</Text>
            </View>
          </View>

          <View className="payment-info-section">
            <View className="payment-info-row">
              <Text className="payment-info-label">订单编号</Text>
              <Text className="payment-info-value">{orderId}</Text>
            </View>
            <View className="payment-info-row">
              <Text className="payment-info-label">支付方式</Text>
              <Text className="payment-info-value">微信支付</Text>
            </View>
          </View>
        </View>

        <View className="payment-methods">
          <View className="payment-method-item active">
            <Text className="payment-method-icon">💚</Text>
            <Text className="payment-method-name">微信支付</Text>
            <View className="payment-method-check" />
          </View>
        </View>
      </View>

      <View className="payment-bottom-bar">
        <NutButton onClick={handleCancel} className="payment-btn-cancel">
          取消
        </NutButton>
        <NutButton
          type="primary"
          loading={paying}
          onClick={handlePay}
          className="payment-btn-confirm"
        >
          确认支付 ¥{amount}
        </NutButton>
      </View>

      <Dialog
        visible={showResult}
        title={paySuccess ? '支付成功' : '支付失败'}
        onConfirm={handleResultConfirm}
        hideCancelButton
      >
        {paySuccess
          ? '您的预约已确认，请按时到店享受服务。'
          : '支付未完成，请稍后重试。'}
      </Dialog>
    </View>
  )
}

export default PaymentPage
