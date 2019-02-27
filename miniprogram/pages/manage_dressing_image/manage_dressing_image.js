// miniprogram/pages/manage_dressing_image/manage_dressing_image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    reallList:[],
    isShow:false,
    choosed: '选择',
    id:[]

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
        // this.setData({
        //   list: res.result.data
        // })
        var temp = res.result.data
        if (temp != undefined && temp.length != 0) {
          var tempReal = []
          for (var i = 0; i < temp.length; i++) {
            tempReal[i] = temp[i].url
            temp[i].hidden=true
          }
          this.setData({
            reallList: tempReal,
            list: temp
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
  if(this.data.isShow){
    this.setData({
      isShow:false,
      choosed:'选择'
    })
  }else{
    this.setData({ isShow: true, choosed: '取消'})
  }
  },

  clickItem:function(e){
    if (this.data.isShow){
      var index = e.currentTarget.dataset.id
  
      var hidden = this.data.list[index].hidden
      var temps = this.data.list;
      var tempIds = this.data.id
      if (hidden){
        temps[index].hidden=false
        tempIds[index] = this.data.list[index]._id 
        console.log("index:" + index)
     
      }else{
        temps[index].hidden = true
         tempIds.splice(index,1)
       
      }
      this.setData({
        list: temps,
        id: tempIds
      })
    }else{
      var temp = this.data.list
      if (temp != undefined && temp.length != 0) {
        var tempReal = []
        for (var i = 0; i < temp.length; i++) {
          tempReal[i] = temp[i].url
          temp[i].hidden = true
        }
        this.setData({
          id:[],
          list: temp
        })
      }
    }
  
  },
  delete: function () {
    // 调用云函数
    wx.showLoading({
      icon: 'none',
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'deletePhoto',
      data: {
        id: this.data.id[0]
      },
      success: res => {
        console.log('[云函数] result: ', res)
        // this.setData({
        //   list: res.result.data
        // })
        // var temp = this.data.list
        // if (temp != undefined && temp.length != 0) {
        //   var tempReal = []
        //   for (var i = 0; i < temp.length; i++) {
        //     tempReal[i] = temp[i].url
        //   }
        //   this.setData({
        //     reallList: tempReal
        //   })
        // }

        wx.hideLoading()
        // wx.stopPullDownRefresh()
      },
      fail: err => {
        console.error('[云函数] 调用失败', err)
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        wx.hideLoading()
        // wx.stopPullDownRefresh()
      }
    })
  },

  cancel: function () {
    //返回上一级关闭当前页面
    wx.navigateBack({
      delta: 1
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