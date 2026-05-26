import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import { Tag, Button as NutButton } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/components/navigation_header'
import Router from '@/utils/route'
import { mockOrders, ORDER_STATUS_MAP, OrderItem } from '@/mock/orders'
import './detail.scss'

const OrderDetail: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.params
  const [order, setOrder] = useState<OrderItem | null>(null)

  useEffect(() => {
    if (id) {
      const found = mockOrders.find((o) => o.id === id)
      setOrder(found || null)
    }
  }, [id])

  const handleCancel = () => {
    Taro.showModal({
      title: t('orders.cancel'),
      content: t('orders.cancelConfirm'),
      success: (res) => {
        if (res.confirm) {
          if (order) {
            order.status = 'cancelled'
            setOrder({ ...order })
          }
          Taro.showToast({ title: t('orders.cancelledSuccess'), icon: 'success' })
        }
      },
    })
  }

  const handlePay = () => {
    Router.navigateTo({
      url: '/orders/payment',
      query: { orderId: order?.id || '', amount: String(order?.price || 0) },
    })
  }

  if (!order) {
    return (
      <View className="order-detail-page">
        <NavigationHeader title={t('orders.detail')} />
        <View className="detail-loading">{t('common.loading')}</View>
      </View>
    )
  }

  const statusInfo = ORDER_STATUS_MAP[order.status]

  return (
    <View className="order-detail-page">
      <NavigationHeader title={t('orders.detail')} />
      <ScrollView scrollY className="detail-scroll">
        <View className="detail-status-bar" style={{ backgroundColor: statusInfo.color }}>
          <Text className="detail-status-text">{t(statusInfo.labelKey)}</Text>
        </View>

        <View className="detail-section">
          <View className="detail-service-row">
            <Image
              src={order.serviceImage}
              className="detail-service-image"
              mode="aspectFill"
            />
            <View className="detail-service-info">
              <Text className="detail-service-name">{order.serviceName}</Text>
              <Text className="detail-service-price">¥{order.price}</Text>
            </View>
          </View>
        </View>

        <View className="detail-section">
          <Text className="section-title">{t('orders.bookingInfo')}</Text>
          <View className="detail-info-grid">
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('orders.date')}</Text>
              <Text className="detail-info-value">{order.date}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('orders.time')}</Text>
              <Text className="detail-info-value">{order.timeSlot}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('services.name')}</Text>
              <Text className="detail-info-value">{order.customerName}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('services.phone')}</Text>
              <Text className="detail-info-value">{order.customerPhone}</Text>
            </View>
            {order.remark ? (
              <View className="detail-info-item full-width">
                <Text className="detail-info-label">{t('services.remark')}</Text>
                <Text className="detail-info-value">{order.remark}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="detail-section">
          <Text className="section-title">{t('orders.orderInfo')}</Text>
          <View className="detail-info-grid">
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('orders.orderId')}</Text>
              <Text className="detail-info-value">{order.id}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">{t('orders.createdAt')}</Text>
              <Text className="detail-info-value">{order.createdAt.slice(0, 10)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="detail-bottom-bar">
        {order.status === 'pending' && (
          <View className="detail-bottom-actions">
            <NutButton onClick={handleCancel} className="detail-btn-cancel">
              {t('orders.cancel')}
            </NutButton>
            <NutButton type="primary" onClick={handlePay}>
              {t('orders.payNow')}
            </NutButton>
          </View>
        )}
        {order.status === 'cancelled' && (
          <NutButton block disabled>{t('orders.cancelled')}</NutButton>
        )}
        {order.status === 'completed' && (
          <NutButton block disabled>{t('orders.completed')}</NutButton>
        )}
        {order.status === 'confirmed' && (
          <NutButton block disabled>{t('orders.confirmed')}</NutButton>
        )}
      </View>
    </View>
  )
}

export default OrderDetail
