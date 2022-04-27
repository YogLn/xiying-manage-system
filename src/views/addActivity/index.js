import React, { memo, useState } from 'react'
import { Form, Input, Button, Card, DatePicker, message } from 'antd'
import Upload from '@/components/upload'
import { uploadImg } from '@/utils/upload'
import { addActivityReq } from '@/services/activity'

const Activity = memo(() => {
  const { TextArea } = Input
  const [formRef] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [form, setForm] = useState({})
  const addActivity = async imgUrl => {
    const res = await addActivityReq({ ...form, imgUrl })
    console.log(res)
    if (res.code === 200) {
      message.success('发布成功~')
      formRef.resetFields()
    }
  }
  const onFinish = async values => {
    setForm(values)
    uploadImg(fileList[0])(addActivity)
  }
  const handleImgUpload = file => {
    setFileList([...fileList, file])
  }

  return (
    <Card className="container">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        form={formRef}
      >
        <Form.Item
          label="活动名称"
          name="title"
          rules={[{ required: true, message: '请输入活动名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="活动详情"
          name="detail"
          rules={[{ required: true, message: '请输入活动详情' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="获奖人数"
          name="awardNum"
          rules={[{ required: true, message: '请输入获奖人数' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="活动海报" name="imgUrl">
          <Upload handleImgUpload={handleImgUpload} />
        </Form.Item>
        <Form.Item
          label="开始时间"
          name="startTime"
          rules={[{ required: true, message: '请选择活动开始时间' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="结束时间"
          name="endTime"
          rules={[{ required: true, message: '请选择活动结束时间' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
})

export default Activity
