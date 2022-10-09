// pages/user/form.js
Page({

  /**
   * Page initial data
   */
  data: {
    preferences: [
      {value: 'puppy', name: 'puppy'},
      {value: 'adult', name: 'adult'},
      {value: 'senior', name: 'senior'},
      {value: 'no preference', name: 'no preference'}
    ],
    options: [
      {value: 'adopt', name: 'adopt'},
      {value: 'foster', name: 'foster'}
    ]
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

  goBack() {
    wx.redirectTo({
      url: '/pages/user/profile',
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

  }
})