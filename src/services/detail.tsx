import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Tag, Button as NutButton, Input, TextArea } from '@nutui/nutui-react-taro'
import NavigationHeader from '@/shared/components/navigation_header'
import Router from '@/shared/utils/route'
import { inject, observer } from 'mobx-react'
import { getServiceDetail, submitBooking } from '@/shared/services/appointment.service'
import { ServiceItem } from '@/shared/mock/services'
import './detail.scss'

const ServiceDetail: React.FC<{ store?: any }> = ({ store }) => {
  const router = useRouter()
  const { id, book } = router.params
  const [service, setService] = useState<ServiceItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(!!book)

  // Booking form
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
      Taro.showToast({ title: '请填写完整信息', icon: 'none' })
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
      Taro.showToast({ title: '预约成功！', icon: 'success' })
      setTimeout(() => Router.backToHome(), 1500)
    } catch (e) {
      Taro.showToast({ title: '预约失败，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  // Generate date options for next 7 days
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const label = `${d.getMonth() + 1}月${d.getDate()}日`
    return { key, label }
  })

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  if (!service) return <View className="detail-loading">加载中...</View>

  return (
    <View className="service-detail-page">
      <NavigationHeader title={service.name} />
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
            <Text className="detail-duration">⏱ 约{service.duration}分钟</Text>
          </View>

          <Text className="detail-desc">{service.description}</Text>
        </View>

        {showForm && (
          <View className="detail-section booking-form">
            <Text className="section-title">预约信息</Text>

            <View className="form-group">
              <Text className="form-label">选择日期</Text>
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
              <Text className="form-label">选择时间</Text>
              <View className="time-grid">
                {timeSlots.map((t) => (
                  <View
                    key={t}
                    className={`time-item ${selectedTime === t ? 'active' : ''}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    <Text>{t}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="form-group">
              <Text className="form-label">姓名</Text>
              <Input
                placeholder="请输入姓名"
                value={name}
                onChange={(v) => setName(v)}
                className="form-input"
              />
            </View>

            <View className="form-group">
              <Text className="form-label">手机号</Text>
              <Input
                placeholder="请输入手机号"
                type="number"
                maxlength={11}
                value={phone}
                onChange={(v) => setPhone(v)}
                className="form-input"
              />
            </View>

            <View className="form-group">
              <Text className="form-label">备注（选填）</Text>
              <TextArea
                placeholder="如有特殊需求请注明"
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
            立即预约
          </NutButton>
        ) : (
          <NutButton
            type="primary"
            size="large"
            loading={loading}
            onClick={handleBook}
          >
            确认预约
          </NutButton>
        )}
      </View>
    </View>
  )
}

export default inject('store')(observer(ServiceDetail))
