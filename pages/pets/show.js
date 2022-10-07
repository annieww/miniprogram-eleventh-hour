// pages/pets/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    pets: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('options from onLoad', options)
    let id = options.id
    let page = this
    // Get api data
    wx.request({
      url: `http://localhost:3000/api/v1/pets/${id}`,
      // method: 'GET',
      success(res) {
        console.log({res})
        const pet = res.data;
        console.log("Pet:" + res.data)
        // Update local data
        page.setData({pet: pet});
        // wx.hideToast();
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  getData() {
    let page = this
    console.log('from show.js = onshow: options', page.options)
    let id = page.options.id
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        console.log("From show.js - onshow: res",res)
        if (res.statusCode === 200) {
          const pet = res.data.pet;
          page.setData({
            pet: pet

          });
          console.log("From show.js: status code is", res.statusCode)
        }
      }
    })
  },

  onShow() {
    if (app.globalData.header) {
      this.getData()
    } else {
      wx.event.on('loginFinished', this, this.getData)
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})