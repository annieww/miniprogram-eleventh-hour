// pages/user/profile.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
		requested_pets: [],
		bookings: [],
		// bookings: {},
    nickName: '',
    userInfo: {},
    // hasUserInfo: '',
		// canIuseGetUserProfile: false,
		image: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
  },
	
	// onChooseAvatar(e) {
	// 	const image = e.detail.avatarUrl
	// 	this.image = e.detail.avatarUrl
	// 	console.log('this->', this)
	// 	console.log('e.detail', e.detail)
	// 	console.log("avatarUrl", e.detail.avatarUrl)
	// 	wx.uploadFile({
	// 		url:  `${app.globalData.baseURL}/upload`,
	// 		filePath: image,
	// 		name: 'file',
	// 		formData: {
	// 			'user': 'test'
	// 		},
	// 		// success(res) {
	// 		// 	const data = JSON.parse(res.data)
	// 		// }
	// 	})
	// 	this.setData({
	// 		image: e.detail.avatarUrl,
	// 		// hasUserInfo: true,
	// 	})
	// },
	
	// submitNickname (e) {
	// 	const nickName = e.detail.value.nickName
	// 	console.log('nickName', nickName)
	// },

	
  onLoad(options) {

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
        selected: 2
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
	
  changeLanguage() {
    app.changeLanguage()
    wx.reLaunch({
      url: '/pages/user/profile',
    })
	},
	
	goToPet(e) {
    console.log('From index.js - goToPet: e', e)
    const id = e.currentTarget.dataset.id
    console.log("From index.js - goToPet: petid: ",id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${id}`,
      })
  },

	delete(e) {
		const index = e.currentTarget.dataset.index
		const id = this.data.requested_pets[index].id
		const pet_id = this.data.requested_pets[index].id
    const booking_id = this.data.bookings[index].id
		console.log(pet_id, booking_id)
    const page = this
    wx.showModal({
      title: 'Note!',
			content: 'Delete from favorites?',
			cancelText: "No",
			confirmText: "Yes",
      complete: (res) => {
        if (res.cancel) {
        }
        if (res.confirm) {
          wx.request({
            header: app.globalData.header,
            url: `${app.globalData.baseURL}/pets/${pet_id}/bookings/${booking_id}`,
            method: 'DELETE',
            success: (res) => {
              this.getData()
              wx.showToast({
                title: 'Deleted!',
                duration: 1000
              })
            }, 
            fail: (err) => {
              console.log(err)
            }
          })
        }
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