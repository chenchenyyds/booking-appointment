import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useTranslation } from 'react-i18next'
import { Tag, Button as NutButton, Input, TextArea } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/components/navigation_header'
import Router from '@/utils/route'
import { inject, observer } from 'mobx-react'
import { getServiceDetail, submitBooking } from '@/services/appointment.service'
import { showSubscribePrompt } from '@/services/notification'
import { ServiceItem } from '@/mock/services'
import './detail.scss'

const ServiceDetail: React.FC<{ store?: any }> = ({ store }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, book } = router.params
  const [service, setService] = useState<ServiceItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(!!book)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [remark, setRemark] = useState('')

  useEffect(() => {
    if (id) loadService(id)
  }, [id])

  const loadService = async (serviceId: string) => {
    const data = await getServiceDetail(serviceId)
    if (data) setService(data)
  }

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !name || !phone) {
      Taro.showToast({ title: t('services.fillComplete'), icon: 'none' })
      return
    }
    setLoading(true)
    try {
      await submitBooking({
        serviceId: id || '',
        date: selectedDate,
        timeSlot: selectedTime,
        name,
        phone,
        remark,
      })
      Taro.showToast({ title: t('services.bookingSuccess'), icon: 'success' })
      setTimeout(() => {
        showSubscribePrompt(
          t('notification.title'),
          t('notification.content'),
          t('notification.confirmText'),
          t('notification.cancelText'),
          () => Router.backToHome()
        )
      }, 1500)
    } catch (e) {
      Taro.showToast({ title: t('services.bookingFail'), icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const label = `${d.getMonth() + 1}月${d.getDate()}日`
    return { key, label }
  })

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  if (!service) return <View className="detail-loading">{t('common.loading')}</View>

  return (
    <View className="service-detail-page">
      <NavigationHeader title={t('services.detail')} />
      <ScrollView scrollY className="detail-scroll">
        <Image
          src={service.image}
          className="detail-image"
          mode="aspectFill"
        />

        <View className="detail-section">
          <View className="detail-header">
            <Text className="detail-name">{service.name}</Text>
            <View className="detail-tags">
              {service.tags.map((tag) => (
                <Tag key={tag} type="primary">{tag}</Tag>
              ))}
            </View>
          </View>

          <View className="detail-price-row">
            <View className="detail-price">
              <Text className="detail-price-symbol">¥</Text>
              <Text className="detail-price-value">{service.price}</Text>
            </View>
            <Text className="detail-duration">⏱ {t('services.minutes', { count: service.duration })}</Text>
          </View>

          <Text className="detail-desc">{service.description}</Text>
        </View>

        {showForm && (
          <View className="detail-section booking-form">
            <Text className="section-title">{t('services.bookingTitle')}</Text>

            <View className="form-group">
              <Text className="form-label">{t('services.selectDate')}</Text>
              <View className="date-grid">
                {dateOptions.map((d) => (
                  <View
                    key={d.key}
                    className={`date-item ${selectedDate === d.key ? 'active' : ''}`}
                    onClick={() => setSelectedDate(d.key)}
                  >
                    <Text>{d.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="form-group">
              <Text className="form-label">{t('services.selectTime')}</Text>
              <View className="time-grid">
                {timeSlots.map((slot) => (
                  <View
                    key={slot}
                    className={`time-item ${selectedTime === slot ? 'active' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <Text>{slot}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="form-group">
              <Text className="form-label">{t('services.name')}</Text>
              <Input
                placeholder={t('services.name')}
                value={name}
                onChange={(v) => setName(v)}
                className="form-input"
              />
            </View>

            <View className="form-group">
              <Text className="form-label">{t('services.phone')}</Text>
              <Input
                placeholder={t('services.phone')}
                type="number"
                maxlength={11}
                value={phone}
                onChange={(v) => setPhone(v)}
                className="form-input"
              />
            </View>

            <View className="form-group">
              <Text className="form-label">{t('services.remark')}</Text>
              <TextArea
                placeholder={t('services.remarkPlaceholder')}
                value={remark}
                onChange={(v) => setRemark(v)}
                className="form-textarea"
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View className="detail-bottom-bar">
        <View className="detail-bottom-price">
          <Text className="bottom-price-symbol">¥</Text>
          <Text className="bottom-price-value">{service.price}</Text>
        </View>
        {!showForm ? (
          <NutButton type="primary" size="large" onClick={() => setShowForm(true)}>
            {t('services.bookNow')}
          </NutButton>
        ) : (
          <NutButton
            type="primary"
            size="large"
            loading={loading}
            onClick={handleBook}
          >
            {t('services.confirmBooking')}
          </NutButton>
        )}
      </View>
    </View>
  )
}

export default inject('store')(observer(ServiceDetail))
