// miniprogram/pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      dressing_id:"1",
      url:"cloud://bill-cde1db.6269-bill-cde1db/my-image.jpeg",
      tag:"",
      title:"",
      desc:""
    },
      {
        dressing_id: "2",
        url: "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812",
        tag: "",
        title: "",
        desc: ""
      },
      {
        dressing_id: "3",
        url: "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812",
        tag: "",
        title: "",
        desc: ""
      },
      {
        dressing_id: "4",
        url: "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812",
        tag: "",
        title: "",
        desc: ""
      },
      {
        dressing_id: "5",
        url: "https://6269-bill-cde1db-1257788440.tcb.qcloud.la/WechatIMG143.jpeg?sign=a62415b81a049bce937e4e85f396827c&t=1550306812",
        tag: "",
        title: "",
        desc: ""
      }],
      reallList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   this.query()
  },

query:function(){
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
        if (temp!=undefined&&temp.length!=0){
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


  clickItem:function(e){
    var url = e.currentTarget.dataset.url
   wx.previewImage({
     urls: this.data.reallList,
     current: url
   })
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
    this.query();
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