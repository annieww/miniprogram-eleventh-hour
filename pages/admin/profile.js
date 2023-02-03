// pages/admin/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
		bookings: {},
    requested_users: [
      {name: 'Julian'},
      {name: 'Annie'}
    ],

		active_tab: "application",
		src: "/images/admin.png"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
		console.log(options)
		if(app.globalData.header) {
			this.getData()
		}else{
			wx.event.on('loginFinished', this, this.getData)
		}
	},
	getData() {
		let page = this
		wx.request({
			header: app.globalData.header,
			url: `${app.globalData.baseURL}/admin`,
			success(res){
				const bookings = res.data.bookings
				page.setData({
					bookings
				})
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
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()){
      this.getTabBar().setData({
        selectedTabIndex: 4
      })
    }
    this.setData({
      content: app.globalData.content
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

  // active_application() {
  //   this.setData({
  //     active_tab: "application"
  //   })
  // },

  active_request() {
    this.setData({
      active_tab: "request"
    })
  },

  // active_listing() {
  //   this.setData({
  //     active_tab: "listing"
  //   })
  // }
})