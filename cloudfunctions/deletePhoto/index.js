// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const db = cloud.database({
    env: 'bill-cde1db'
  })
  const res = await db.collection('dressing_photo').doc(event.id).remove({
  }
  )
  return res
}