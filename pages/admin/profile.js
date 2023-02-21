// pages/admin/profile.js
let app = getApp()
Page({
  data: {
		requested_users: [
			{
				id: 1,
				name: 'Ann',
				image: 'https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
				booked_pets: [
					{
						id: 1,
						name: 'Snoopy',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					},
					{
						id: 2,
						name: 'Dobby',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					},
					{
						id: 3,
						name: 'Tiger',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					}
				]
			},
			{
				id: 2,
				name: 'Ann',
				image: 'https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
				booked_pets: [
					{
						id: 1,
						name: 'Snoopy',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					},
					{
						id: 2,
						name: 'Dobby',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					},
					{
						id: 3,
						name: 'Tiger',
						image_url: 'https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
					}
				]
			}
		]
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