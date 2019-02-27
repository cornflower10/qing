// miniprogram/pages/manage_dressing_image/manage_dressing_image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    reallList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.query()
  },

  query: function () {
    // 调用云函数
    wx.showLoading({
      icon: 'none',
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'queryIndex',
      data: {},
      success: res => {
        console.log('[云函数] result: ', res.result.data)
        this.setData({
          list: res.result.data
        })
        var temp = this.data.list
        if (temp != undefined && temp.length != 0) {
          var tempReal = []
          for (var i = 0; i < temp.length; i++) {
            tempReal[i] = temp[i].url
          }
          this.setData({
            reallList: tempReal
          })
        }

        wx.hideLoading()
        wx.stopPullDownRefresh()
      },
      fail: err => {
        console.error('[云函数] 调用失败', err)
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  choose:function(){

  },
  delete: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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