// miniprogram/pages/dressing_info/dressing_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      id:"",
      images: ["https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812", "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/my-image.jpeg?sign=88f1366f8488526c29398f0329177d81&t=1550306737", "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812",
      "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812"]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  previewImage() {
    var { info } = this.data;
    wx.previewImage({
      urls: info.images
    })
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