// miniprogram/pages/upload_image/upload_image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   temp_images:[],
   i:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temps = options.temp_images;
    if (temps==undefined){
      return
    }
    var temp = JSON.parse(temps)
    this.setData({ temp_images: temp})
  },
  cancel:function(){
    //返回上一级关闭当前页面
    wx.navigateBack({
      delta: 1
    })


  },

  upload:function(){
    var that = this
    wx.showLoading({
      title: '上传中',
    })
    var temp = this.data.temp_images
    if (temp == undefined || temp == '' || temp.length == 0){
      return
    }
    //  上传图片
    that.up()
  },

  up(){
    var that = this
    var filePath = this.data.temp_images[this.data.i]
    const cloudPath = Date.parse(new Date()).toString() + filePath + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)

        that.addDressImage(res.fileID, '', '', '')


      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  addDressImage: function (url,tag,title,desc) {
    var that = this
    // 调用云函数
    // console.log('[云函数] url: ', +url)
    // wx.cloud.callFunction({
    //   name: 'addDressImage',
    //   data: {
    //     url: url,
    //     tag: "",
    //     title: "",
    //     desc: ""
    //   },
    //   success: res => {
    //     console.log('[云函数] result: ', res.result)
  
    //   },
    //   fail: err => {
    //     console.error('[云函数] 调用失败', err)
    //     wx.showToast({
    //       icon: 'none',
    //       title: '上传失败',
    //     })
    //     wx.hideLoading()
    //   }
    // })

    const db = wx.cloud.database({
      env: 'bill-cde1db'
    })

    db.collection('dressing_photo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        url: url,
        tag: tag,
        title: title,
        desc:desc,
        create_time: Date.parse(new Date())
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        var i = that.data.i
         i++
        that.setData({ i: i})
        if(i<that.data.temp_images.length){
          console.log('上传' + i+"张")
          that.up()
        }else{
          console.log('上传' + i + "张成功")
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '上传成功',
            duration:1000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
      , 
      fail(error){
        console.log(error)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      }
    }
   
    )
     
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})