import { mockServices, ServiceItem } from '@/mock/services'

export interface BookingForm {
  serviceId: string
  date: string
  timeSlot: string
  name: string
  phone: string
  remark: string
}

export async function getServices(category?: string): Promise<ServiceItem[]> {
  // Mock: simulate network delay
  await new Promise((r) => setTimeout(r, 300))
  if (category) {
    return mockServices.filter((s) => s.category === category)
  }
  return mockServices
}

export async function getServiceDetail(id: string): Promise<ServiceItem | null> {
  await new Promise((r) => setTimeout(r, 200))
  return mockServices.find((s) => s.id === id) || null
}

export async function submitBooking(form: BookingForm): Promise<{ orderId: string }> {
  // Mock: simulate booking submission
  await new Promise((r) => setTimeout(r, 500))
  return {
    orderId: `ORD${Date.now()}`,
  }
}
