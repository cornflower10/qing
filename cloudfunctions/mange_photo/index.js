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
  var pageIndex = event.pageIndex;
  var pageSize = 40;
  var skip = (pageIndex - 1) * pageSize
  console.log(skip)
  const db = cloud.database({
    env: 'bill-cde1db'
  })
  const res = await db.collection('dressing_photo').skip(skip).limit(pageSize).orderBy("create_time", 'desc').get({})
  return res
}