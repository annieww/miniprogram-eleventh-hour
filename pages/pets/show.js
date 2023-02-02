// pages/pets/show.js
const app = getApp()
Page({

  data: {
		neuteredDisplay: '',
		vaccinatedDisplay:'',
		specialNeedDisplay: '',
		adoptionStatus: ''
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
          const pet = res.data.pet;
					let neuteredDisplay = pet.neutered ? 'yes' : 'no';
					let vaccinatedDisplay = pet.vaccinated ? 'yes' : 'no';
					let specialNeedDisplay = pet.special_need ? 'yes' : 'no';
					let adoptionStatus = pet.adoptable? 'available': 'not available';
          page.setData({
						pet: pet,
						neuteredDisplay: neuteredDisplay,
						vaccinatedDisplay: vaccinatedDisplay,
						specialNeedDisplay: specialNeedDisplay,
						adoptionStatus: adoptionStatus
					});
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