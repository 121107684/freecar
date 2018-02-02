// pages/seeinfo/seeinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  calling: function (e) {
    console.log(e.target.dataset.callnum)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.callnum, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: options.userid,
      carid: options.carinfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data);
    app.publicpost("carinfo", "GET", {
      userid: this.data.userid,
      carid: this.data.carid
    }, res => {
      this.setData({
        info:res.data.data
      })
      console.log(this.data)
    })
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