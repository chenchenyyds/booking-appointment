export interface ServiceItem {
  id: string
  name: string
  description: string
  price: number
  duration: number
  image: string
  category: string
  tags: string[]
}

export const serviceCategories = [
  { key: 'hair', name: '理发美发' },
  { key: 'beauty', name: '美容护肤' },
  { key: 'nails', name: '美甲美睫' },
  { key: 'massage', name: '按摩理疗' },
]

export const mockServices: ServiceItem[] = [
  {
    id: '1',
    name: '精致剪发',
    description: '专业发型师为您打造完美发型，包含洗发、剪发、造型',
    price: 98,
    duration: 45,
    image: 'https://api.slingacademy.com/public/sample-photos/1.jpeg',
    category: 'hair',
    tags: ['热门', '推荐'],
  },
  {
    id: '2',
    name: '烫染套餐',
    description: '高品质烫发/染发服务，使用进口药水，持久定型',
    price: 388,
    duration: 120,
    image: 'https://api.slingacademy.com/public/sample-photos/2.jpeg',
    category: 'hair',
    tags: ['优惠'],
  },
  {
    id: '3',
    name: '深层清洁面部护理',
    description: '深层清洁毛孔，补水保湿，提亮肤色',
    price: 198,
    duration: 60,
    image: 'https://api.slingacademy.com/public/sample-photos/3.jpeg',
    category: 'beauty',
    tags: ['推荐'],
  },
  {
    id: '4',
    name: 'SPA 全身按摩',
    description: '舒缓疲劳，放松身心，专业按摩师一对一服务',
    price: 298,
    duration: 90,
    image: 'https://api.slingacademy.com/public/sample-photos/4.jpeg',
    category: 'massage',
    tags: ['热门', '推荐'],
  },
  {
    id: '5',
    name: '日式美甲',
    description: '时尚美甲设计，多种款式可选，进口甲油胶',
    price: 168,
    duration: 75,
    image: 'https://api.slingacademy.com/public/sample-photos/5.jpeg',
    category: 'nails',
    tags: ['新品'],
  },
  {
    id: '6',
    name: '肩颈理疗',
    description: '针对久坐族的肩颈放松，缓解肌肉酸痛',
    price: 158,
    duration: 45,
    image: 'https://api.slingacademy.com/public/sample-photos/6.jpeg',
    category: 'massage',
    tags: ['推荐'],
  },
]
