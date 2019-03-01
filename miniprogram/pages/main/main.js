// miniprogram/pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    list:[],
      reallList:[],
      isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   this.query()
  },

query:function(add){
  var that = this;
  this.setData({
    isLoading: true
  })

  if(!add){
    that.setData({
      pageIndex:1
    })
  }
  var pageIndex = that.data.pageIndex
  console.log("--------"+pageIndex)
    // 调用云函数
  wx.showLoading({
    icon: 'none',
    title: '加载中',
  })
    wx.cloud.callFunction({
      name: 'queryIndex',
      data: { pageIndex: pageIndex },
      success: res => {
        console.log('[云函数] result: ', res.result.data)
        if (add){
          console.log('加载更多'+pageIndex)
          var listTemp = that.data.list
          this.setData({
            list: listTemp.concat(res.result.data)
          })
        }else{
          this.setData({
            list: res.result.data
          })
        }
      
        var temp = this.data.list
        if (temp!=undefined&&temp.length!=0){
          var tempReal = []
          for (var i = 0; i < temp.length; i++) {
            tempReal[i] = temp[i].url
          }
          this.setData({
            reallList: tempReal
          })
        }else{
          if (pageIndex <= 1) {
            that.setData({ pageIndex: 1 })
            return
          } else {
            pageIndex--
            that.setData({ pageIndex: pageIndex })
          }
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
        if (pageIndex <= 1) {
          that.setData({ pageIndex: 1 })
          return
        } else {
          pageIndex--
          that.setData({ pageIndex: pageIndex })
        }
      },
      complete:()=>{
        that.setData({
          isLoading: false
        })
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
    var index = e.currentTarget.dataset.index
    var start = 0
    var end = 20
    if (index - 10==0){
      start=0
      end = 20
    } else if (index - 10>0){
      start = index-10
      end = index+10
     var temp = this.data.reallList.length
      if (end > temp+1){
        end = end - (end - temp)  
      }
    }else{
      start = 0
      end = index+(Math.abs(index-10))+10
    }
    console.log("satrt:"+start+"end:"+end)
    var urls = this.data.reallList.slice(start,end)
   wx.previewImage({
     urls: urls,
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
    if(this.data.isLoading){
      return
    }
    this.query();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoading) {
      return
    }
    var pageIndex = this.data.pageIndex
    pageIndex++
    this.setData({ pageIndex: pageIndex })
    this.query(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})