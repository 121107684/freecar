import wxValidate from 'utils/wxValidate'
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力 
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //console.log(new Date("2018-10-09 21:00").getTime())
    // 登录
    // wx.login({ 
    //   success: res => {
    //     console.log(res); 
    //     wx.request({
    //       url: "http://127.0.0.1:3000/login/login",
    //       method: 'POST', 
    //       data: {
    //         jscode: res.code
    //       },
    //       success: function (res) {
    //         console.log(res)
    //       } 
    //     })
    //   } 
    // }) //重新登录
    // wx.setStorageSync('token', "oa_ci0fnNnqyLbrTBGk5i-sD9Xs0")

    wx.checkSession({
      success: function (res) {
        //session 未过期，并且在本生命周期一直有效
        //console.log("走了这里",res)
        that.getuserinfo() 
      },
      fail: function (res) {
        //登录态过期
        console.log(res)
        that.userlogin()

      }
    })
    // //获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(res.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // wx.getUserInfo({
    //   success: res => {
    //     this.globalData.userInfo = res.userInfo
    //     console.log(this.globalData)
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    pubilcUrl: "http://127.0.0.1:3000/carapp/",
    loginStatus:false
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  publicpost: function (url, method, data, successcall, servererror) {
    var thistoken = wx.getStorageSync('token')
    let postdata = {
      token: thistoken,
      data: { ...data }
    }
    wx.request({
      url: this.globalData.pubilcUrl + url, //仅为示例，并非真实的接口地址
      method: method,
      data: postdata,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        successcall(res);
      },
      fail: function (res) {
        //servererror(res);
      }
    })
  },
  getuserinfo:function(){
    let that = this
    wx.getUserInfo({
      success: res => {
        console.log(res)
        that.globalData.userInfo = res.userInfo
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  },
  userlogin:function(){

    let that = this;
    wx.login({
      success: res => {
        console.log(res);
        wx.request({
          url: "http://127.0.0.1:3000/login/login",
          method: 'POST',
          data: {
            jscode: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data)
            that.getuserinfo()
          }
        })
      }
    }) //重新登录
  }
 



})