import React, { memo } from 'react'
import { Spin } from 'antd'
import './index.less'

const Loading = memo(() => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
})

export default Loading
