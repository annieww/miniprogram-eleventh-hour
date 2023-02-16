// pages/user/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
		requested_pets: [],
		bookings: [],
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

  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  onReady() {
  },

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
      this.getData()
    } else {
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
				console.log("From user/profile.js: res",res)
				page.setData({
					requested_pets: res.data.booked_pets, 
					bookings: res.data.bookings
				})
      }
    })
	},
	
	delete(e) {
		const index = e.currentTarget.dataset.index
		const pet_id = this.data.requested_pets[index].id
		const booking_id = this.data.bookings[index].id
		console.log(pet_id, booking_id)
		const page = this
    wx.request({
			header: app.globalData.header,
			url: `${app.globalData.baseURL}/pets/${pet_id}/bookings/${booking_id}`,
			method: 'DELETE',
			success: (res) => {
				this.getData()
			}, 
			fail: (err) => {
				console.log(err)
			}
    })
  },

  onHide() {

  },


  onUnload() {

  },


  onPullDownRefresh() {

  },


  onReachBottom() {

  },

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