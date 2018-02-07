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
      self.setData({
        listcar: res.data.data,
        total: res.data.total
      })
      
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
      self.setData({
        listcar: res.data.data,
        total: res.data.total
      })
    }
    wx.showNavigationBarLoading()
    this.getlistdata(listfun)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log((this.data.index) * 5 >= this.data.total)
    // if ((this.data.index) * 5 >= this.data.total) {
    //   this.setData({
    //     isHideNoMore: false
    //   })
    // }
    this.setData({
      index:this.data.index + 1,
      isHideLoadMore: false
    })
    if (!this.data.isHideLoadMore){
      console.log(this.data)
      return false
    }
    this.getlistdata(addarr);
    function addarr(res,self){
      console.log(self)
      self.data.listcar = self.data.listcar.concat(res.data.data)
      self.setData({
        isHideLoadMore: true,
        listcar: self.data.listcar
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  seeinfo:function(){
    
  }
})