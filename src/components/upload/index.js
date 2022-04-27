import React, { memo, useState } from 'react'

import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const UploadImg = memo(props => {
  const { handleImgUpload } = props
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [imgList, setImgList] = useState([])
  const [fileList, setFileList] = useState([])

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handleChange = ({ fileList, file }) => {
    setImgList(fileList)
  }
  const imgListUpLoad = file => {
    setFileList([...fileList, file])
    handleImgUpload(file)
    setFileList([])
    // setImgList([])
  }

  return (
    <div>
      <Upload
        action="#"
        listType="picture-card"
        fileList={imgList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={imgListUpLoad}
      >
        {imgList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
})

export default UploadImg
