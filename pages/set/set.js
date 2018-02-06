// pages/set/set.js
const app = getApp() 
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["个人中心", "我的发布"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    usernametrue:'白杨',
    age: 28,
    cartype: '福特',
    phonenum:18519023323,
    carcode: '冀G2E175',
    submitHidden: true,
    nologin:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo:false
  }, 
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.WxValidate = app.wxValidate(
      {
        usernametrue: {
          required: true,
          minlength: 2,
          maxlength: 5,
        },
        cartype: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        phonenum: {
          required: true,
          tel:true
        }
      },{
        usernametrue: {
          required: '请填写真实姓名',
        },
        cartype: {
          required: '请输入公司名称',
        },
        phonenum: {
          required: '请输入绑定客户',
        }
      }
    );

    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        canIUse:true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // app.publicpost("getuserinfo", "GET", {}, function (res) {
    //   console.log(res)
      
    // })

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  userinfoup:function(e){
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        icon: 'loading',
        image: '/images/error.png',
        duration: 2000
      })
      return false
    }
   // this.setData({ submitHidden: false })
    var that = this
    //提交

    const postdata = {
      usernametrue: e.detail.value.usernametrue,
      age: e.detail.value.age,
      cartype: e.detail.value.cartype,
      phonenum: e.detail.value.phonenum,
      carcode: e.detail.value.carcode
    }
    console.log(postdata)
    app.publicpost("adduser", "POST", postdata,function(res){
      console.log(res)
      wx.showToast({
        title: res.title,
        icon: 'success',
        image: '/images/error.png',
        duration: 2000
      })
    })
    
  },
  
})