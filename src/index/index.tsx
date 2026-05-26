import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import PageContainer from '@/components/page_container'
import { Button } from '@nutui/nutui-react-taro'
import { inject, observer } from 'mobx-react'
import Router from '@/utils/route'
import { serviceCategories } from '@/mock/services'
import LanguageSwitcher from '@/components/language-switcher'

import './index.scss'

const categoryIcons: Record<string, string> = {
  hair: '💇',
  beauty: '💆',
  nails: '💅',
  massage: '🧘',
}

const Index: React.FC<{ store?: any }> = ({ store }) => {
  const { t } = useTranslation()

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
    <PageContainer title={t('app.name')} containerClass="index">
      <LanguageSwitcher />
      <View className="home-banner">
        <View className="home-banner-content">
          <Text className="home-banner-title">{t('home.bannerTitle')}</Text>
          <Text className="home-banner-subtitle">{t('home.bannerSubtitle')}</Text>
        </View>
      </View>

      <View className="home-section">
        <View className="home-section-header">
          <Text className="home-section-title">{t('home.categories')}</Text>
          <Text className="home-section-more" onClick={handleViewAll}>
            {t('home.viewAll')} &gt;
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
          <Text className="home-section-title">{t('home.quickActions')}</Text>
        </View>
        <View className="home-quick-actions">
          <Button
            block
            size="large"
            type="primary"
            onClick={handleViewAll}
            className="home-quick-btn"
          >
            {t('home.browseServices')}
          </Button>
          <Button
            block
            size="large"
            onClick={() => Router.switchTab({ url: '/user/index' })}
            className="home-quick-btn-outline"
          >
            {t('home.myOrders')}
          </Button>
        </View>
      </View>
    </PageContainer>
  )
}

export default inject('store')(observer(Index))
