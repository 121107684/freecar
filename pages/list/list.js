const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    listcar:[],
    size:5,
    index:1,
    downhidden:true,
    hasMore: true,
    hasRefesh: false,
    isHideNoMore:true,
    total:0
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function listfun(res,self){
      self.caranduser(res.data.data.car, res.data.data.users)
      self.setData({
        listcar: res.data.data.car,
        total: res.data.data.total
      })
      console.log(self.data.listcar)
      if (self.data.listcar.length <= self.data.total){
        self.setData({
          isHideNoMore: false
        })
      }
    }
    this.getlistdata(listfun);

  },
  getlistdata:function(callback){
    let getdata = {
      limit: this.data.size,
      index: this.data.index
    }
    app.publicpost("carlist", "GET", getdata, res=>{
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      callback(res,this)
      // that.setData({
      //   index: that.data.index+1
      // })
    })

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      index:1
    })
    function listfun(res, self) {
      self.caranduser(res.data.data.car, res.data.data.users)
      self.setData({
        listcar: res.data.data.car,
        total: res.data.data.total
      })
    }
    wx.showNavigationBarLoading()
    this.getlistdata(listfun)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isHideLoadMore) {
      console.log(this.data.isHideLoadMore)
      return false
    }
    //console.log((this.data.index) * 5 >= this.data.total)
    this.setData({
      index:this.data.index + 1,
      isHideLoadMore: false
    })
    
    this.getlistdata(addarr);
    function addarr(res,self){
      console.log(self)
      self.caranduser(res.data.data.car, res.data.data.users)
      self.data.listcar = self.data.listcar.concat(res.data.data.car)
      self.setData({
        isHideLoadMore: true,
        listcar: self.data.listcar
      })
      if (self.data.listcar.length <= self.data.total) {
        self.setData({
          isHideNoMore: true
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  caranduser:function(carlist,userlist){
    for(var i in carlist){
      for(var j in userlist){
        if(carlist[i].id==userlist[j].openid){
          carlist[i] = { ...carlist[i], ...userlist[j]};
          break;
        }
      }
    }
  }
})