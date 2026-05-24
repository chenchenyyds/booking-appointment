import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Tabs, Tag, Badge } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { mockOrders, ORDER_STATUS_MAP, OrderStatus } from '@/shared/mock/orders'
import './index.scss'

const statusTabs: { key: string; title: string }[] = [
  { key: 'all', title: '全部' },
  { key: 'pending', title: '待确认' },
  { key: 'confirmed', title: '已确认' },
  { key: 'completed', title: '已完成' },
  { key: 'cancelled', title: '已取消' },
]

const OrderList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all')

  const filteredOrders =
    activeTab === 'all'
      ? mockOrders
      : mockOrders.filter((o) => o.status === activeTab)

  const handleOrderClick = (orderId: string) => {
    Router.navigateTo({ url: '/orders/detail', query: { id: orderId } })
  }

  return (
    <View className="order-list-page">
      <NavigationHeader title="我的预约" />
      <View className="order-list-content">
        <Tabs
          value={activeTab}
          onChange={(v) => setActiveTab(v as string)}
          className="order-tabs"
        >
          {statusTabs.map((tab) => (
            <Tabs.TabPane key={tab.key} title={tab.title} value={tab.key} />
          ))}
        </Tabs>

        <ScrollView scrollY className="order-scroll">
          {filteredOrders.length === 0 ? (
            <View className="order-empty">暂无订单</View>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = ORDER_STATUS_MAP[order.status]
              return (
                <View
                  key={order.id}
                  className="order-card"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <Image
                    src={order.serviceImage}
                    className="order-card-image"
                    mode="aspectFill"
                  />
                  <View className="order-card-body">
                    <View className="order-card-row">
                      <Text className="order-service-name">{order.serviceName}</Text>
                      <Tag
                        style={{ backgroundColor: statusInfo.color, color: '#fff', border: 'none' }}
                      >
                        {statusInfo.label}
                      </Tag>
                    </View>
                    <View className="order-card-info">
                      <Text className="order-date">
                        📅 {order.date} {order.timeSlot}
                      </Text>
                      <Text className="order-price">¥{order.price}</Text>
                    </View>
                    <View className="order-card-footer">
                      <Text className="order-id">订单号: {order.id}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default OrderList
