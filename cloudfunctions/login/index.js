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

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  var show = true;
  const wxContext = cloud.getWXContext()
  if (wxContext.OPENID == 'o17ME5h9u-5F9GaDJ4E-uLYYW2UY' || wxContext.OPENID == 'o17ME5gIsWbgtDu1cNnlygLb0WmQ'){
    show = false
  }else{
    show = true
  }
  return {
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
    show: show
  }

  // const db = wx.cloud.database({
  //   env: 'bill-cde1db'
  // })
  // db.collection('dressing_photo').get({
  //   success(res) {
  //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
  //     console.log(res.data)
  //   return res
  //   }
  // })



  // db.collection('dressing_photo').add({
  //   // data 字段表示需新增的 JSON 数据
  //   data: {
  //     url: event.url,
  //     tag: event.tag,
  //     title: event.title,
  //     desc: event.desc
  //   },
  //   success(res) {
  //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //     console.log(res)
  //      return res
  //   }
  // })
}
