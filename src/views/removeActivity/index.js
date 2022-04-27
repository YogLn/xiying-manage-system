import React, { memo, useState, useEffect } from 'react'
import { Button, Table, message, Popconfirm, Image } from 'antd'
import { getActivityListReq, deleteActivityReq } from '@/services/activity'
import { formatUtcString } from '@/utils/format'
import './index.less'

const RemoveActivity = memo(() => {
  const [list, setList] = useState([])

  const getList = async () => {
    const res = await getActivityListReq()
    const newList = []
    for (const item of res.data) {
      newList.push({ ...item, key: item.id })
    }
    setList(newList)
  }

  useEffect(() => {
    getList()
  }, [])

  const handleDeleteClick = async ({ id }) => {
    const res = await deleteActivityReq(id)
    if (res.code === 200) {
      message.success('删除成功')
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
      title: '活动标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: imgUrl => <Image src={imgUrl} alt="" className="img" />
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: startTime => <span>{formatUtcString(startTime)}</span>
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: endTime => <span>{formatUtcString(endTime)}</span>
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: text => (
        <div>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => handleDeleteClick(text)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]
  return (
    <div className="container">
      <Table columns={columns} dataSource={list} pagination={false} />
    </div>
  )
})

export default RemoveActivity
