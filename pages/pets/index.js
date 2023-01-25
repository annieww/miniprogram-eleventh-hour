// pages/pets/index.js
const app = getApp()

Page({
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
      }
      // {
      //   id: 4,
      //   name: "Adoption FAQ",
      //   image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
      // }
    ],

    pets: [
      {
        // id: 1,
        name: "Dobby",
        species: "Dog",
        gender: "Male",
        age: "1 year",
        tag: "foster",
        vaccination_status: "fully vaccinated",
        neutered: "true",
        image_url: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      },
      {
        // id: 2,
        name: "Tiger",
        species: 'Cat',
        gender: "Female",
        age: "6 months",
        tag: "adopt",
        vaccination_status: "fully vaccinated",
        neutered: "false",
        image_url: "https://images.unsplash.com/photo-1553545999-8621dce8d75e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
      }
    ],

    // tags: [
    //   {
    //     name: "foster",
    //     image_url: "/images/foster.png"
    //   },
    //   {
    //     name: "adopt",
    //     image_url: "/images/adopt.png"
    //   }
    // ],

    items: [
      {
        type: 'filter',
        label: 'Filter',
        value: 'filter',
        checked: true, 
        children: [
          {
            type: 'radio',
            label: 'Species',
            value: 'species',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true
              },
              {
                label: 'Dogs',
                value: 'dog'
              },
              {
                label: 'Cats',
                value: 'cat'
              },
              {
                label: 'Other',
                value: 'other'
              },
            ],
          },
          {
            type: 'radio',
            label: 'Gender',
            value: 'gender',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true,
              },
              {
                label: 'Female',
                value: 'female'
              },
              {
                label: 'Male',
                value: 'male'
              },
            ],
          },
          {
            type: 'radio',
            label: 'Size',
            value: 'size',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true,
              },
              {
                label: 'Mini',
                value: 'Mini'
              },
              {
                label: 'Small',
                value: 'Small'
              },
              {
                label: 'Medium',
                value: 'Medium',
              },
              {
                label: 'Large',
                value: 'Large'
              },
            ],
          },
        ],
        groups: ['001', '002', '003'],
      },
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  
  onLoad(options) {
    this.setData({
      content: wx.getStorageSync('content')
    })
    // console.log(this.data)
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
    this.setData({
      content: app.globalData.content,
    })
    if (app.globalData.header) {
    // proceed to fetch api
    this.getData()
    } else {
      // wait until loginFinished, then fetch API
      wx.event.on('loginFinished', this, this.getData)
    }
  },

  getData(){
    const page = this
    // console.log('From getData onshow: header', app.globalData.header)
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        // console.log("From index.js onshow: res.data",res.data)
        page.setData({
          pets: res.data,
          content: app.globalData.content
        })
      }
    })
  },

  onChange(e) {
    const { checkedItems, items, checkedValues } = e.detail
    const params = { filter: true }
    console.log("From index.js - filter onChange: e", e)
    console.log(checkedItems, items, checkedValues)

    checkedItems.forEach((n) => {
      n.children
        .filter((n) => n.selected)
        .forEach((n) => {
          if (n.value === 'species'){
            params.species = n.children
            .filter((n) => n.checked)
            .map((n) => n.value)
            .join(',')
          } else if (n.value === 'gender') {
            params.gender  = n.children
            .filter((n) => n.checked)
            .map((n) => n.value)
            .join(',')
          } else if (n.value === 'size') {
            params.size = n.children
            .filter((n) => n.checked)
            .map((n) => n.value)
            .join(',')
          }
        })
    })
    this.getRepos(params)
  },
  getRepos(params = {}) {
    console.log("From index.js - getRepos: params", params)
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      header: app.globalData.header,
      data: params,
      success: (res) => {
        console.log(res)
        this.setData({
          pets: res.data
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
    }
  },

  // selectLanguage(e) {
  //   if (this.data.tag !== e.currentTarget.dataset.tag) {
  //     this.setData({
  //       language: e.currentTarget.dataset.tag
  //     })
  //   }
  // },
  changeLanguage() {
    app.changeLanguage()
    wx.reLaunch({
      url: '/pages/pets/index',
    })
  },

  onOpen(e) {
    this.setData({ opened: true })
  },
  onClose(e) {
    this.setData({ opened: false })
  },
  noop() {},

  goToPet(e) {
    console.log('From index.js - goToPet: e', e)
    const id = e.currentTarget.dataset.id
    console.log("From index.js - goToPet: petid: ",id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${id}`,
      })
  },

  showMenu(e) {
    console.log(e);
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