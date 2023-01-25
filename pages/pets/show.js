// pages/pets/show.js
const app = getApp()
Page({

  data: {
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
          page.setData({
            pet: pet
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
      url: `/pages/pets/form`
    })
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