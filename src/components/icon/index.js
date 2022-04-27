import { createFromIconfontCN } from '@ant-design/icons'

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3350893_momee3zdevh.js' // 在 iconfont.cn 上生成
})

export default function Icon({ type, ...itemProps }) {
  if (!type) return null
  return <MyIcon type={type} {...itemProps} />
}
