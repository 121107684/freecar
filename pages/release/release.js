// pages/release/release.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departure:"北京",
    destination:"怀来县",
    seatnum:3,
    place:50,
    date:'2018-07-01',
    time:"21:00",
    memo:"大件行李提前告知",
    array: ['仅一次', '每日', '每周', '其他'],
    arrindex:0
  },
  departure: function (e) {
    this.setData({
      departure: e.detail.value
    })
  },
  destination: function (e) {
    this.setData({
      destination: e.detail.value
    })
  },
  seatnum: function (e) {
    this.setData({
      seatnum: e.detail.value
    })
  },
  place: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  memo: function (e) {
    this.setData({
      memo: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      arrindex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = app.wxValidate(
      {
        departure: {
          required: true
        },
        destination: {
          required: true
        },
        seatnum: {
          required: true,
          minlength: 1,
          maxlength: 2,
        },
        date:{
          required: true
        },
        time: {
          required: true
        }
      }, {
        departure: {
          required: '请填写出发地',
        },
        destination: {
          required: '请输入目的地',
        },
        seatnum: {
          required: '请输入空座位',
        },
        date: {
          required: '填写出发日期',
        },
        time: {
          required: '填写出发时间',
        }
      }
    )
  },
  releaseupdata: function (e) {
    //提交错误描述
    console.log(e)
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
      departure: e.detail.value.departure,
      destination: e.detail.value.destination,
      seatnum: e.detail.value.seatnum,
      place: e.detail.value.place,
      date: e.detail.value.date,
      time: e.detail.value.time,
      memo: e.detail.value.memo,
      arrindex: e.detail.value.arrindex,
    }
    
    app.publicpost("addgo", "POST", postdata, function (res) {
      wx.showToast({
        title: res.data.errormsg,
        icon: 'success',
        duration: 2000
      })
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