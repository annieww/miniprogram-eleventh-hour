// pages/pets/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    events: [
      {
        name: "Adoption Day",
        location: "Jing'An",
        time: "October 30th",
        imageurl: "https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
      },
      {
        name: "Dogs of the month",
        imageurl: "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      },
      {
        name: "Cats of the month",
        imageurl: "https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      },
      {
        name: "Adoption FAQ",
        imageurl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
      }
    ],

    pets: [
      {
        name: "Dobby",
        sex: "boy",
        imageurl: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      },
      {
        name: "Tiger",
        sex: "girl",
        imageurl: "https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
      }
    ],

    tags: [
      {
        name: "foster",
        imageurl: "/images/foster.png"
      },
      {
        name: "adopt",
        imageurl: "/images/adopt.png"
      }
    ]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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
    const pets = app.globalData.pets
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
      this.getNewData()
    }
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