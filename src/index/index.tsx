import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import PageContainer from '@/shared/components/page_container'
import { Button } from '@nutui/nutui-react-taro'
import { inject, observer } from 'mobx-react'
import Router from '@/shared/utils/route'
import { serviceCategories } from '@/shared/mock/services'

import './index.scss'

const categoryIcons: Record<string, string> = {
  hair: '💇',
  beauty: '💆',
  nails: '💅',
  massage: '🧘',
}

const Index: React.FC<{ store?: any }> = ({ store }) => {
  const handleCategoryClick = (cat: string) => {
    Router.navigateTo({
      url: '/services/index',
      query: { category: cat },
    })
  }

  const handleViewAll = () => {
    Router.navigateTo({ url: '/services/index' })
  }

  return (
    <PageContainer title="预约助手" containerClass="index">
      <View className="home-banner">
        <View className="home-banner-content">
          <Text className="home-banner-title">在线预约</Text>
          <Text className="home-banner-subtitle">选择服务，轻松预约</Text>
        </View>
      </View>

      <View className="home-section">
        <View className="home-section-header">
          <Text className="home-section-title">服务分类</Text>
          <Text className="home-section-more" onClick={handleViewAll}>
            查看全部 &gt;
          </Text>
        </View>
        <View className="home-category-grid">
          {serviceCategories.map((cat) => (
            <View
              key={cat.key}
              className="home-category-item"
              onClick={() => handleCategoryClick(cat.key)}
            >
              <View className="home-category-icon">
                <Text>{categoryIcons[cat.key] || '📋'}</Text>
              </View>
              <Text className="home-category-name">{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="home-section">
        <View className="home-section-header">
          <Text className="home-section-title">快捷入口</Text>
        </View>
        <View className="home-quick-actions">
          <Button
            block
            size="large"
            type="primary"
            onClick={handleViewAll}
            className="home-quick-btn"
          >
            浏览全部服务
          </Button>
          <Button
            block
            size="large"
            onClick={() => Router.switchTab({ url: '/user/index' })}
            className="home-quick-btn-outline"
          >
            我的订单
          </Button>
        </View>
      </View>
    </PageContainer>
  )
}

export default inject('store')(observer(Index))
