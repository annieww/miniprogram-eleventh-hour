// pages/pets/index.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    events: [
      {
        id: 1,
        name: "Adoption Day",
        location: "Jing'An",
        time: "October 30th",
        image_url: "https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
      },
      {
        id: 2,
        name: "Dogs of the month",
        image_url: "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 3,
        name: "Cats of the month",
        image_url: "https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      },
      {
        id: 4,
        name: "Adoption FAQ",
        image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
      }
    ],

    pets: [
      {
        name: "Dobby",
        gender: "boy",
        district: "Pudong",
        age: "1 year",
        image_url: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        description: "Dog waiting for a foster home."
      },
      {
        name: "Tiger",
        gender: "girl",
        district: "Huangpu",
        age: "6 months",
        image_url: "https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        description: "Cat for adoption!"
      }
    ],

    tags: [
      {
        name: "foster",
        image_url: "/images/foster.png"
      },
      {
        name: "adopt",
        image_url: "/images/adopt.png"
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.setData({
      content: wx.getStorageSync('content')
    })
  },
  changeLanguage() {
    app.changeLanguage()
    wx.reLaunch({
      url: '/pages/pets/index',
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
    // if (app.globalData.header) {
      // proceed to fetch api
    this.setData({
      content: app.globalData.content
    })
  },

  getData(){
    const page = this
    console.log('From index.js onshow: header', app.globalData.header)
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        let pets = res.data
        console.log("From index.js onshow: res.data",res.data)
        page.setData({
          pets: pets
        })
      }
    })
  },

  goToFAQ() {
    wx.switchTab({
      url: '/pages/admin/faq'
    })
  },

  selectTag(e) {
    if (this.data.tag !== e.currentTarget.dataset.tag) {
      this.setData({
        tag: e.currentTarget.dataset.tag
      })
      this.getData()
    }
  },

  goToPet(e) {
    console.log('From index.js - goToPet: e', e)
    const id = e.currentTarget.dataset.id
    console.log("From index.js - goToPet: petid: ",id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${id}`,
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

  }
})