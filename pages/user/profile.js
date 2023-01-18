// pages/user/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    requested_pets: [
      {name: 'Tiger'},
      {name: 'Snowy'}
    ],

    favorited_pets: [
      {name: 'Dobby'},
      {name: 'Buddy'}
    ],

    active_tab: "request"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  goToForm() {
    wx.redirectTo({
      url: '/pages/user/form',
    })
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

  },

  active_request() {
    this.setData({
      active_tab: "request"
    })
  },

  active_favorite() {
    this.setData({
      active_tab: "favorite"
    })
  },
})