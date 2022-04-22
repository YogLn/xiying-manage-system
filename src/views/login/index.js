import React, { memo, useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { useHistory } from 'react-router-dom'
import MyIcon from '@/components/icon'
import './index.less'

const IPT_RULE_USERNAME = [
  {
    required: true,
    message: '请输入用户名'
  }
]
const IPT_RULE_PASSWORD = [
  {
    required: true,
    message: '请输入密码'
  }
]

const login = memo(() => {
  const history = useHistory()
  const [btnLoad, setBtnLoad] = useState(false)

  const onFinish = values => {
    console.log(values)
    setBtnLoad(true)
    message.success('登录成功')
    history.push('/main')
  }

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">西影管理系统</div>
        <div className="welcome">欢迎使用，请先登录</div>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item name="account" rules={IPT_RULE_USERNAME}>
            <Input
              prefix={<MyIcon type="icon-nickname" />}
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item name="pswd" rules={IPT_RULE_PASSWORD}>
            <Input
              prefix={<MyIcon type="icon-mima" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item className="btns">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={btnLoad}
            >
              登录
            </Button>
            <Button htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default login
