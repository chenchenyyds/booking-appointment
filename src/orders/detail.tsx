import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Tag, Button as NutButton } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { mockOrders, ORDER_STATUS_MAP, OrderItem } from '@/shared/mock/orders'
import './detail.scss'

const OrderDetail: React.FC = () => {
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
      title: '确认取消',
      content: '确定要取消该预约吗？',
      success: (res) => {
        if (res.confirm) {
          if (order) {
            order.status = 'cancelled'
            setOrder({ ...order })
          }
          Taro.showToast({ title: '已取消', icon: 'success' })
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
        <NavigationHeader title="订单详情" />
        <View className="detail-loading">加载中...</View>
      </View>
    )
  }

  const statusInfo = ORDER_STATUS_MAP[order.status]

  return (
    <View className="order-detail-page">
      <NavigationHeader title="订单详情" />
      <ScrollView scrollY className="detail-scroll">
        <View className="detail-status-bar" style={{ backgroundColor: statusInfo.color }}>
          <Text className="detail-status-text">{statusInfo.label}</Text>
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
          <Text className="section-title">预约信息</Text>
          <View className="detail-info-grid">
            <View className="detail-info-item">
              <Text className="detail-info-label">预约日期</Text>
              <Text className="detail-info-value">{order.date}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">预约时间</Text>
              <Text className="detail-info-value">{order.timeSlot}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">姓名</Text>
              <Text className="detail-info-value">{order.customerName}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">手机号</Text>
              <Text className="detail-info-value">{order.customerPhone}</Text>
            </View>
            {order.remark ? (
              <View className="detail-info-item full-width">
                <Text className="detail-info-label">备注</Text>
                <Text className="detail-info-value">{order.remark}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View className="detail-section">
          <Text className="section-title">订单信息</Text>
          <View className="detail-info-grid">
            <View className="detail-info-item">
              <Text className="detail-info-label">订单编号</Text>
              <Text className="detail-info-value">{order.id}</Text>
            </View>
            <View className="detail-info-item">
              <Text className="detail-info-label">创建时间</Text>
              <Text className="detail-info-value">{order.createdAt.slice(0, 10)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="detail-bottom-bar">
        {order.status === 'pending' && (
          <View className="detail-bottom-actions">
            <NutButton onClick={handleCancel} className="detail-btn-cancel">
              取消预约
            </NutButton>
            <NutButton type="primary" onClick={handlePay}>
              去支付
            </NutButton>
          </View>
        )}
        {order.status === 'cancelled' && (
          <NutButton block disabled>已取消</NutButton>
        )}
        {order.status === 'completed' && (
          <NutButton block disabled>已完成</NutButton>
        )}
        {order.status === 'confirmed' && (
          <NutButton block disabled>已确认</NutButton>
        )}
      </View>
    </View>
  )
}

export default OrderDetail
