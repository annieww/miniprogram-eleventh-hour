// pages/pets/show.js
const app = getApp()
Page({

  data: {
		neuteredDisplay: '',
		vaccinatedDisplay:'',
		specialNeedDisplay: '',
		adoptionStatus: '', 
		my_booking: {}, 
		current_user: {}
  },

  onLoad(options) {

  },

  onReady() {

  },

  getData() {
		let page = this
		let id = page.options.id
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        if (res.statusCode === 200) {
					console.log('user', res.data)
					const pet = res.data.pet;
					const current_user = res.data.current_user
					const my_booking = res.data.my_booking;
					const date = new Date();
					let neuteredDisplay = pet.neutered ? 'yes' : 'no';
					let vaccinatedDisplay = pet.vaccinated ? 'yes' : 'no';
					let specialNeedDisplay = pet.special_need ? 'yes' : 'no';
					let adoptionStatus = pet.adoptable? 'available': 'not available';
          page.setData({
						pet: pet,
						neuteredDisplay: neuteredDisplay,
						vaccinatedDisplay: vaccinatedDisplay,
						specialNeedDisplay: specialNeedDisplay,
						adoptionStatus: adoptionStatus,
						current_user: current_user, 
					})
          console.log("From show.js: status code", res.statusCode)
        }
      }
    })
  },

  onShow() {
    if (app.globalData.header) {
      this.getData()
    } else {
			wx.event.on('loginFinished', this, this.getData)
    }
	},
	
	showBookingModal(e){
		console.log('pet show - booking:', e)
	},

	submitBooking(e){
		console.log("submit booking -> e",e)
		let page = this
		let date = Date.now()
		wx.request({
      url: `${app.globalData.baseURL}/pets/${this.data.pet.id}/bookings`,
      header: app.globalData.header,
      method: "POST",
      data: {
        date: date 
			},
		})
	},

  edit(e) {
    wx.setStorageSync('editId', this.data.pet.id)
    wx.switchTab({
      header: app.globalData.header,
      url: "form"
    })
    console.log('editId is ->', this.data.pet.id)
  },

  delete(e) {
    let id = this.data.pet.id
    wx.showModal({
      title: 'Are you sure?',
      content: 'Are you sure to delete this post?',
      success(res) {
        if (res.confirm) {
          wx.request({
            header: app.globalData.header,
            url: `${app.globalData.baseURL}/pets/${id}`,
            method: 'DELETE',
            success(res){
              wx.switchTab({
                url: '/pages/pets/index',
              })
            }
          })

        } else {
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
    return {
      name: this.data.pet.name,
      image_url: this.data.pet.image_url,
      path: `pages/pets/show?id=${this.options.id}`
    }
  }
})