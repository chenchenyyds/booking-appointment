import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import { Tabs, Tag, Badge } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/components/navigation_header'
import LanguageSwitcher from '@/components/language-switcher'
import Router from '@/utils/route'
import { mockOrders, ORDER_STATUS_MAP, OrderStatus } from '@/mock/orders'
import './index.scss'

const OrderList: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('all')

  const statusTabs: { key: string; title: string }[] = [
    { key: 'all', title: t('orders.all') },
    { key: 'pending', title: t('orders.pending') },
    { key: 'confirmed', title: t('orders.confirmed') },
    { key: 'completed', title: t('orders.completed') },
    { key: 'cancelled', title: t('orders.cancelled') },
  ]

  const filteredOrders =
    activeTab === 'all'
      ? mockOrders
      : mockOrders.filter((o) => o.status === activeTab)

  const handleOrderClick = (orderId: string) => {
    Router.navigateTo({ url: '/orders/detail', query: { id: orderId } })
  }

  return (
    <View className="order-list-page">
      <NavigationHeader title={t('orders.title')} />
      <LanguageSwitcher />
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
            <View className="order-empty">{t('orders.empty')}</View>
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
                        {t(statusInfo.labelKey)}
                      </Tag>
                    </View>
                    <View className="order-card-info">
                      <Text className="order-date">
                        📅 {order.date} {order.timeSlot}
                      </Text>
                      <Text className="order-price">¥{order.price}</Text>
                    </View>
                    <View className="order-card-footer">
                      <Text className="order-id">{t('orders.orderId')}: {order.id}</Text>
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
