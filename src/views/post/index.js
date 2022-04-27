import React, { memo, useState, useEffect } from 'react'
import { Button, Table, Image, message, Popconfirm } from 'antd'
import { getPostListReq, auditPostReq, deletePostReq } from '@/services/post'
import './index.less'

const Post = memo(() => {
  const [postList, setPostList] = useState([])

  const getPostList = async () => {
    const res = await getPostListReq()
    const newList = []
    for (const item of res.data) {
      newList.push({ ...item, key: item.postId })
    }
    setPostList(newList)
  }

  useEffect(() => {
    getPostList()
  }, [])

  const handleAuditClick = async ({ postId }) => {
    const res = await auditPostReq(postId)
    if (res.code === 200) {
      message.success('通过成功')
      getPostList()
    }
  }
  const handleDeleteClick = async ({ postId }) => {
    const res = await deletePostReq(postId)
    if (res.code === 200) {
      message.success('删除成功')
      getPostList()
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
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '帖子配图',
      dataIndex: 'img',
      key: 'img',
      render: img => {
        if (!img || img.length === 0) return '无'
        else {
          img = img.split(';')
          return img.map(item => <Image width={70} src={item} key={item} />)
        }
      }
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
      <Table columns={columns} dataSource={postList} pagination={false} />
    </div>
  )
})

export default Post
