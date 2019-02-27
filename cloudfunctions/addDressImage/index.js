// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  console.log(event)
  console.log(context)


  const db = wx.cloud.database({
    env: 'bill-cde1db'
  })

  db.collection('dressing_photo').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      url: event.url,
      tag: event.tag,
      title: event.title,
      desc: event.desc
    },
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
      return res
    }
  })
}
