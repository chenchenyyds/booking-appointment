import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Tabs, Card, Tag } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { getServices, getServiceDetail } from '@/shared/services/appointment.service'
import { serviceCategories, ServiceItem } from '@/shared/mock/services'
import './index.scss'

const ServiceList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('hair')
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadServices(activeCategory)
  }, [activeCategory])

  const loadServices = async (category: string) => {
    setLoading(true)
    try {
      const data = await getServices(category)
      setServices(data)
    } catch (e) {
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleServiceClick = (service: ServiceItem) => {
    Router.navigateTo({
      url: '/services/detail',
      query: { id: service.id },
    })
  }

  const handleBookNow = (e: any, service: ServiceItem) => {
    e.stopPropagation()
    Router.navigateTo({
      url: '/services/detail',
      query: { id: service.id, book: '1' },
    })
  }

  return (
    <View className="service-list-page">
      <NavigationHeader title="服务项目" />
      <View className="service-list-content">
        <Tabs
          value={activeCategory}
          onChange={(v) => setActiveCategory(v as string)}
          className="service-tabs"
        >
          {serviceCategories.map((cat) => (
            <Tabs.TabPane key={cat.key} title={cat.name} value={cat.key} />
          ))}
        </Tabs>

        <ScrollView scrollY className="service-scroll">
          {services.map((service) => (
            <View
              key={service.id}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              <Image
                src={service.image}
                className="service-card-image"
                mode="aspectFill"
              />
              <View className="service-card-body">
                <View className="service-card-header">
                  <Text className="service-card-name">{service.name}</Text>
                  <View className="service-card-tags">
                    {service.tags.map((tag) => (
                      <Tag key={tag} type="primary" className="service-tag">
                        {tag}
                      </Tag>
                    ))}
                  </View>
                </View>
                <Text className="service-card-desc">{service.description}</Text>
                <View className="service-card-footer">
                  <View className="service-card-price">
                    <Text className="price-symbol">¥</Text>
                    <Text className="price-value">{service.price}</Text>
                  </View>
                  <View className="service-card-meta">
                    <Text className="service-duration">⏱ {service.duration}分钟</Text>
                    <View
                      className="service-book-btn"
                      onClick={(e) => handleBookNow(e, service)}
                    >
                      <Text className="book-btn-text">立即预约</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
          {!loading && services.length === 0 && (
            <View className="service-empty">暂无服务项目</View>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default ServiceList
