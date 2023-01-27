// pages/user/info.js
Page({

  /**
   * Page initial data
   */
  data: {
    // general_info: [
    //   {
    //     name: 'Julian', 
    //     age: '27',
    //     job: 'University teacher',
    //     experience: 'trained a cat before'
    //   }
    // ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('hello from user/info.js onLoad')
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
    // let page = this;
    // wx.request({
    //   url: `http://localhost:3000/api/v1/applications`,
    //   method: 'GET',
    //   success(res) {
    //     console.log({res});
    //     const applications = res.data.applications;
    //     page.setData({ 
    //       applications: applications 
    //     });
    //   }
    // })
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

  goBack() {
    wx.redirectTo({
      url: '/pages/user/profile',
    })
  }
})