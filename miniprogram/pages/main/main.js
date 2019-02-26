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
    var temp = this.data.list
    var tempReal=[]
    for(var i= 0;i<temp.length;i++){
      tempReal [i]= temp[i].url
    }
    this.setData({
      reallList:tempReal
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