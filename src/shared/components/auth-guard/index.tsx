import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { inject, observer } from 'mobx-react'
import Router from '@/shared/utils/route'

interface AuthGuardProps {
  store?: any
  children: React.ReactNode
  requireAuth?: boolean
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  store,
  children,
  requireAuth = true,
}) => {
  useEffect(() => {
    if (requireAuth && !store.auth.checkLogin()) {
      Router.navigateTo({ url: '/login/index' })
    }
  }, [])

  if (requireAuth && !store.auth.checkLogin()) {
    return <View />
  }

  return <>{children}</>
}

export default inject('store')(observer(AuthGuard))
