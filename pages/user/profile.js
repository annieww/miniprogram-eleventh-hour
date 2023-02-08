// pages/user/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    requested_pets: [
      {name: 'Tiger', description: 'active cat'},
      {name: 'Snowy', description: 'friendly dog'},
      {name: 'Dobby', description: 'nice puppy'}
		],
		
    nickName: '',
    avatarUrl: '', 
    userInfo: {},
    hasUserInfo: false,
    canIuseGetUserProfile: false
  },

  getUserProfile: function(e) {
    wx.getUserProfile({
      desc: 'complete your profile',
      success: (res) => {
        console.log('res.userInfo -->', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
	handleContact (e) {
		console.log(e.detail.path)
		console.log(e.detail.query)
	},

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