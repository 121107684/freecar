import wxValidate from 'utils/wxValidate'
App({
  onLaunch: function () {
    let that = this;
    var thistoken = wx.getStorageSync('token');
    wx.checkSession({
      success: function (res) {
        //session 未过期，并且在本生命周期一直有效
        //console.log("走了这里",res)
        that.getuserinfo();
        if (thistoken == "" || thistoken == undefined){ 
          //that.alert(thistoken)
        }
        that.userlogin()
      },
      fail: function (res) {
        //登录态过期
        console.log(res)
        that.userlogin()
        that.alert(thistoken)
      }
    })
  },
  globalData: {
    userInfo: null,
    pubilcUrl: "http://127.0.0.1:3000/",
    //pubilcUrl: "https://www.xunfengwx.com/",
    loginStatus: false
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  publicpost: function (url, method, data, successcall, servererror) {
    var thistoken = wx.getStorageSync('token')
    let postdata = {
      token: thistoken,
      data: { ...data }
    }
    wx.request({
      url: this.globalData.pubilcUrl +"carapp/"+ url, //仅为示例，并非真实的接口地址
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
  getuserinfo: function () {
    let that = this
    wx.getUserInfo({
      success: res => {
        console.log(res)
        that.globalData.userInfo = res.userInfo
        that.updatauser(res.userInfo)
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }, fail: res => {

      }
    })
  },
  updatauser: function (postdata) {
    this.publicpost("adduser", "POST", postdata, function (res) {
      console.log(res)
      wx.showToast({
        title: res.title,
        icon: 'success',
        image: '/images/error.png',
        duration: 2000
      })
    })
  },
  userlogin: function () {
    let that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.pubilcUrl+"login/login",
          method: 'POST',
          data: {
            jscode: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data)
            that.getuserinfo();
            //that.alert(res.data.data);
          }
        })
      }
    }) //重新登录
  },
  userInfoReadyCallback: function (res) {
    this.globalData.userInfo = res.userInfo
  },
  alert:function(data){
    wx.showToast({
      title: data,
      duration: 2000
    })
  }
})