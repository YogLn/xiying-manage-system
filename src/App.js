import React, { memo, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { BackTop, ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import Loading from '@/components/loading'
import routes from '@/router'

const App = memo(() => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
      </BrowserRouter>
      <BackTop />
    </ConfigProvider>
  )
})

export default App
