import React, { memo, useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { useHistory } from 'react-router-dom'
import MyIcon from '@/components/icon'
import { loginReq } from '@/services/login'
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

  const onFinish = async values => {
    setBtnLoad(true)
    const res = await loginReq(values)
    if (res.code === 200) {
      message.success('登录成功')
      setBtnLoad(false)
      const obj = {
        data: res?.data?.token,
        time: Date.now(),
        expire: 86400000 * 2
      }
      window.localStorage.setItem('token', JSON.stringify(obj))
      window.localStorage.setItem('username', res.data.username)
      window.localStorage.setItem('avatar', res.data.avatar)
      window.localStorage.setItem('role', res.data.role)
      history.push('/main')
    } else if (res.code === 40101) {
      return message.error('权限不足')
    } else {
      message.error('用户名或密码错误')
      setBtnLoad(false)
      return
    }
  }

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">西影管理系统</div>
        <div className="welcome">欢迎使用，请先登录</div>
        <Form className="login-form" onFinish={onFinish}>
          <Form.Item name="username" rules={IPT_RULE_USERNAME}>
            <Input
              prefix={<MyIcon type="icon-nickname" />}
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item name="password" rules={IPT_RULE_PASSWORD}>
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
