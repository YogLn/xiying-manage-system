import React, { memo, useState, useEffect } from 'react'
import { Button, Table, message, Popconfirm } from 'antd'
import {
  getCommentListReq,
  deleteCommentReq,
  auditCommentReq
} from '@/services/comment'

const Comment = memo(() => {
  const [list, setList] = useState([])

  const getList = async () => {
    const res = await getCommentListReq()
    const newList = []
    for (const item of res.data) {
      newList.push({ ...item, key: item.commentId })
    }
    setList(newList)
  }

  useEffect(() => {
    getList()
  }, [])

  const handleAuditClick = async ({ commentId }) => {
    const res = await auditCommentReq(commentId)
    if (res.code === 200) {
      message.success('通过成功')
    }
  }
  const handleDeleteClick = async ({ postId, commentId }) => {
    const res = await deleteCommentReq({ postId, commentId })
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
      title: '内容',
      dataIndex: 'text',
      key: 'text'
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
      <Table columns={columns} dataSource={list} pagination={false} />
    </div>
  )
})

export default Comment
