// pages/user/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    requested_pets: [
      {name: 'Tiger'},
      {name: 'Snowy'},
      {name: 'Dobby'}
    ],

    favorited_pets: [
      {name: 'Dobby'},
      {name: 'Buddy'},
      {name: 'Snowy'}
    ],

    active_tab: "request"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.getUserInfo({
      withCredentials: false,
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        console.log("from user/profile, userInfo -->", result.userInfo)
        this.setData({
          nickName: result.userInfo.nickName,
          avatarUrl: result.userInfo.avatarUrl
        })
      },
      fail: () => {
      },
      complete: () => { 
      }
    })
    const accInfo = wx.getAccountInfoSync();
    console.log("accInfo -->", accInfo)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()){
      this.getTabBar().setData({
        selectedTabIndex: 2
      })
    }
    this.setData({
      content: app.globalData.content
    })
    if (app.globalData.header) {
      // proceed to fetch api
      this.getData()
    } else {
      // wait until loginFinished, then fetch API
      wx.event.on('loginFinished', this, this.getData)
    }
  },

  getData(){
    const user_id = app.globalData.user.id
    const page = this
    wx.request({
      url: `${app.globalData.baseURL}/users/${user_id}`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        console.log("From user/profile.js: onshow request succesfully")
        console.log("From user/profile.js: res",res)
          let general_info = res.data.upcoming
          // upcoming_trips.map((trip) => {
          //   trip.start_date = wx.se.prettyDate(trip.start_date)
          // })
        // if (res.statusCode === 200) {
        //   let past_trips = res.data.past
        //   past_trips.map((trip) => {
        //     trip.start_date = wx.se.prettyDate(trip.start_date)
        //   })
        //   page.setData({
        //     loadingHidden: true,
        //     past_trips,
        //     upcoming_trips
        //     // user_id: user_id
        //   })
        // } else {
        //   console.log("From profile.js: status code is", res.statusCode)
        // }
      }
    })
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