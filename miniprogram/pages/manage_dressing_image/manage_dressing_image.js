// miniprogram/pages/manage_dressing_image/manage_dressing_image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    reallList: [],
    isShow: false,
    choosed: '选择',
    id: [],
    deleteCount:0,
    pageIndex:1,
    isLoading:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.query()
  },

  query: function(add) {
    // 调用云函数
    var that = this
    that.setData({
      isLoading: true
    })
  
    var pageIndex = this.data.pageIndex
    if(!add){
      this.setData({pageIndex:1})
    }
    wx.showLoading({
      icon: 'none',
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'mange_photo',
      data: { pageIndex: pageIndex},
      success: res => {
        var listResult = res.result.data
        console.log('[云函数] result: ', listResult )
        if (add) {
          console.log('加载更多' + pageIndex)
          var listTemp = that.data.list
          var realTempList = that.data.reallList
        
          if (listResult != undefined && listResult.length != 0) {
            var tempReal = []
            for (var i = 0; i < listResult.length; i++) {
              tempReal[i] = listResult[i].url
              listResult[i].hidden = true
            }
            this.setData({
              reallList: realTempList.concat(tempReal),
              list: listTemp.concat(listResult)
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
        } else {
    
          if (listResult != undefined && listResult.length != 0) {
            var tempReal = []
            for (var i = 0; i < listResult.length; i++) {
              tempReal[i] = listResult[i].url
              listResult[i].hidden = true
            }
            this.setData({
              reallList: tempReal,
              list: listResult
            })
          }
        }

        wx.hideLoading()
    
      },
      fail: err => {
        console.error('[云函数] 调用失败', err)
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
     
        if(pageIndex<=1){
          that.setData({pageIndex:1})
        return
        }else{
          pageIndex--
          that.setData({ pageIndex: pageIndex })
        }
      },
      complete:()=>{
        that.setData({
          isLoading:false
        })
      }
      
    })
  },

  choose: function() {
    if (this.data.isShow) {
      this.setData({
        isShow: false,
        choosed: '选择'
      })
    } else {
      this.setData({
        isShow: true,
        choosed: '取消'
      })
    }
    this.resetData()
  },

  clickItem: function(e) {
    var index = e.currentTarget.dataset.id
    if (this.data.isShow) {
      var hidden = this.data.list[index].hidden
      var temps = this.data.list;
      var tempIds = this.data.id
      if (hidden) {
        temps[index].hidden = false
        tempIds.push(this.data.list[index]._id) 
        console.log("index:" + index)

      } else {
        temps[index].hidden = true
        tempIds.splice(index, 1)

      }
      this.setData({
        list: temps,
        id: tempIds
      })
    } else {
      this.resetData()
      var url = this.data.list[index].url

      var start = 0
      var end = 40
      if (index - 20 == 0) {
        start = 0
        end = 40
      } else if (index - 20 > 0) {
        start = index - 20
        end = index + 20
        var temp = this.data.reallList.length
        if (end > temp + 1) {
          end = end - (end - temp)
        }
      } else {
        start = 0
        end = index + (Math.abs(index - 20)) + 20
      }
      console.log("satrt:" + start + "end:" + end)
      var urls = this.data.reallList.slice(start, end)

      wx.previewImage({
        urls: urls,
        current: url
      })
    }

  },

  resetData: function() {
    var temp = this.data.list
    if (temp != undefined && temp.length != 0) {
      for (var i = 0; i < temp.length; i++) {
        temp[i].hidden = true
      }
      this.setData({
        id: [],
        list: temp
      })
    }
  },
  delete: function() {
    // 调用云函数
    var that = this;
    console.log(that.data.id.length)
    if (that.data.id.length==0){
      return
    }
    var deleteId = that.data.id[that.data.deleteCount]
    console.log("delete参数"+deleteId)
    wx.showLoading({
      icon: 'none',
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'deletePhoto',
      data: {
        id: deleteId
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
        var count = that.data.deleteCount
        count++
        that.setData({deleteCount:count})
        if (count<this.data.id.length){
           that.delete()
        }else{
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '删除成功',
          })
          that.query()
        }
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

  cancel: function() {
    //返回上一级关闭当前页面
    wx.navigateBack({
      delta: 1
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.isLoading){
      return
    }
    var pageIndex  = this.data.pageIndex;
    pageIndex++
    this.setData({pageIndex:pageIndex})
    this.query(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})