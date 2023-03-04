// pages/admin/profile.js
let app = getApp()
Page({
  data: {
		requested_users: [
		],
		userInfo: {},
    hasUserInfo: false,
		canIuseGetUserProfile: false,
		avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
	},
	
	bindchooseavatar(e) {
		const avatarUrl = e.detail.avatarUrl
		console.log('e.detail', e.detail)
		console.log("avatarUrl",e.detail.avatarUrl)
		this.setData({
			avatarUrl,
			hasUserInfo: true,
		})
	},
	
  onLoad(options) {
		if(app.globalData.header) {
			this.getData()
		}else{
			wx.event.on('loginFinished', this, this.getData)
		}
		wx.setNavigationBarTitle({
			title: 'Admin',
		})
	},

	getData() {
		let page = this
		wx.request({
			header: app.globalData.header,
			url: `${app.globalData.baseURL}/admin`,
			success(res){
				const admin = app.globalData.user
				const requested_users = res.data
				page.setData({
					requested_users,
					admin
				})
				console.log("requested_users -> ", requested_users)
			}
		})
  },

	navigateToPetShowPage: function (e) {
		console.log(e)
    let petId = e.currentTarget.dataset.petId;
    wx.navigateTo({
			url: `/pages/pets/show?id=${petId}`,
		})
  },

  onReady() {

  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()){
      this.getTabBar().setData({
        selected: 3
      })
    }
    this.setData({
      content: app.globalData.content
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

  }
})