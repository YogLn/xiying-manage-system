import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDMYUAZgX7SW7TZOvBBuLVO1NSGn31jAKD',
  SecretKey: 'dz4sPecJjslMgkW2HFwNXP0LPChvtafT'
})
export const uploadImg = files => {
  return function (fn) {
    if (files) {
      cos.putObject(
        {
          Bucket: 'blog-1304388092' /* 存储桶 */,
          Region: 'ap-chengdu' /* 存储桶所在地域，必须字段 */,
          Key: files.file.name /* 文件名 */,
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: files.file // 上传文件对象
        },
        async (err, data) => {
          // 上传成功之后
          if (data.statusCode === 200) {
            fn(`https:${data.Location}`)
          }
        }
      )
    } else {
      fn(null)
    }
  }
}
