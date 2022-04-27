import React, { memo, useEffect, useState } from 'react'
import {
  Tag,
  Table,
  Button,
  Modal,
  DatePicker,
  message,
  Input,
  Form
} from 'antd'
import './index.less'
import {
  getUserListReq,
  banUserReq,
  unLockUserReq,
  registerSponsorReq
} from '@/services/user'
import { formatUtcString } from '@/utils/format'

const User = memo(() => {
  const [useList, setUseList] = useState([])
  const [visible, setVisible] = useState(false)
  const [reVisible, setReVisible] = useState(false)
  const [form, setForm] = useState({})
  const [userId, setUserId] = useState()
  const [banTimeEnd, setBanTimeEnd] = useState()

  const getList = () => {
    getUserListReq().then(res => {
      console.log(res)
      const newList = []
      for (const item of res.data) {
        newList.push({ ...item, key: item.id })
      }
      setUseList(newList)
    })
  }

  useEffect(() => {
    getList()
  }, [])

  const onChange = (date, dateString) => {
    setBanTimeEnd(dateString)
  }

  const handleOk = async () => {
    const res = await banUserReq({ banTimeEnd, userId })
    if (res.code === 200) {
      message.success('封号成功')
      getList()
      setVisible(false)
    }
  }
  const handleBanClick = ({ id }) => {
    setVisible(true)
    setUserId(id)
  }
  const handleUnBlockClick = async ({ id }) => {
    const res = await unLockUserReq(id)
    if (res.code === 200) {
      message.success('解封成功')
      getList()
    }
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avatar => <img src={avatar} alt="" className="avatar" />
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: sex => {
        if (sex === 0) return <Tag color="#2db7f5">男</Tag>
        else return <Tag color="#87d068">女</Tag>
      }
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
      render: phone => <span>{phone}</span>
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: role => {
        if (role === 0) return <span>普通用户</span>
        else if (role === 1) return <span>超级管理员</span>
        else return <span>赞助商</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: state => {
        if (state === 0) return <span>正常</span>
        else return <span>封禁</span>
      }
    },
    {
      title: '禁言时间',
      dataIndex: 'banTimeEnd',
      key: 'banTimeEnd',
      render: banTimeEnd => (
        <span>{banTimeEnd && formatUtcString(banTimeEnd)}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: text => {
        if (text.role === 1) {
          return null
        } else
          return (
            <div>
              <Button
                type="link"
                size="small"
                onClick={() => handleUnBlockClick(text)}
              >
                解封
              </Button>
              <Button
                type="link"
                danger
                size="small"
                onClick={() => handleBanClick(text)}
              >
                封号
              </Button>
            </div>
          )
      }
    }
  ]
  const handleFormChange = (e, tag) => {
    setForm({
      ...form,
      [tag]: e.target.value
    })
  }
  const handleRegister = async () => {
    const res = await registerSponsorReq(form)
    if (res.code === 200) {
      message.success('注册成功')
      getList()
      setReVisible(false)
    }
  }
  return (
    <div className="container">
      <Button
        type="primary"
        className="add-btn"
        onClick={() => setReVisible(true)}
      >
        添加赞助商
      </Button>
      <Table columns={columns} dataSource={useList} pagination={false} />
      <Modal
        title="封号时间"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <DatePicker onChange={onChange} />
      </Modal>
      <Modal
        title="注册赞助商"
        visible={reVisible}
        onOk={handleRegister}
        onCancel={() => setReVisible(false)}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空~' }]}
          >
            <Input onChange={e => handleFormChange(e, 'username')} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空~' }]}
          >
            <Input.Password onChange={e => handleFormChange(e, 'password')} />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input onChange={e => handleFormChange(e, 'phone')} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})

export default User
