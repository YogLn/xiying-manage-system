import React, { memo, useState, useEffect } from 'react'
import { Button, Table, message, Popconfirm, Image } from 'antd'
import { getListReq, deleteReq, auditReq } from '@/services/work'

const Work = memo(() => {
  const [list, setList] = useState([])

  const getList = async () => {
    const res = await getListReq()
    const newList = []
    for (const item of res.data) {
      newList.push({ ...item, key: item.rankWorkId })
    }
    setList(newList)
  }

  useEffect(() => {
    getList()
  }, [])

  const handleAuditClick = async ({ rankWorkId }) => {
    const res = await auditReq(rankWorkId)
    if (res.code === 200) {
      message.success('通过成功')
      getList()
    }
  }
  const handleDeleteClick = async ({ rankWorkId }) => {
    const res = await deleteReq(rankWorkId)
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
      title: '作品',
      dataIndex: 'workUrl',
      key: 'workUrl',
      render: workUrl => <Image width={100} src={workUrl} />
    },
    {
      title: '点赞数',
      dataIndex: 'workLike',
      key: 'workLike',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.workLike - b.workLike
    },
    {
      title: '摄影师',
      dataIndex: 'userVo',
      key: 'userVo',
      render: userVo => <span>{userVo.username}</span>
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: text => (
        <div>
          <Button
            type="link"
            size="small"
            onClick={() => handleAuditClick(text)}
          >
            通过
          </Button>
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
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        scroll={{ y: 540 }}
      />
    </div>
  )
})

export default Work
