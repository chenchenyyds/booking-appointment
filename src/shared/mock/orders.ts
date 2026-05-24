export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '待确认', color: '#faad14' },
  confirmed: { label: '已确认', color: '#52c41a' },
  completed: { label: '已完成', color: '#1890ff' },
  cancelled: { label: '已取消', color: '#999' },
}

export interface OrderItem {
  id: string
  serviceName: string
  serviceImage: string
  price: number
  date: string
  timeSlot: string
  status: OrderStatus
  customerName: string
  customerPhone: string
  remark: string
  createdAt: string
}

export const mockOrders: OrderItem[] = [
  {
    id: 'ORD1001',
    serviceName: '精致剪发',
    serviceImage: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
    price: 98,
    date: '2026-05-26',
    timeSlot: '10:00',
    status: 'confirmed',
    customerName: 'Demo User',
    customerPhone: '138****8888',
    remark: '',
    createdAt: '2026-05-24T09:00:00Z',
  },
  {
    id: 'ORD1002',
    serviceName: 'SPA 全身按摩',
    serviceImage: 'https://api.slingacademy.com/public/sample-photos/4.jpeg',
    price: 298,
    date: '2026-05-27',
    timeSlot: '14:00',
    status: 'pending',
    customerName: 'Demo User',
    customerPhone: '138****8888',
    remark: '请安排女技师',
    createdAt: '2026-05-24T11:30:00Z',
  },
  {
    id: 'ORD1003',
    serviceName: '日式美甲',
    serviceImage: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
    price: 168,
    date: '2026-05-23',
    timeSlot: '15:00',
    status: 'completed',
    customerName: 'Demo User',
    customerPhone: '138****8888',
    remark: '',
    createdAt: '2026-05-22T16:00:00Z',
  },
  {
    id: 'ORD1004',
    serviceName: '烫染套餐',
    serviceImage: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
    price: 388,
    date: '2026-05-25',
    timeSlot: '11:00',
    status: 'cancelled',
    customerName: 'Demo User',
    customerPhone: '138****8888',
    remark: '时间冲突',
    createdAt: '2026-05-23T08:00:00Z',
  },
]
