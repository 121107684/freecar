//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.publicpost("addressblock", "GET", {}, res => {
      this.setData({
        list:res.data.data
      })
    })

  },
  getUserInfo: function (e) {
  }
})
