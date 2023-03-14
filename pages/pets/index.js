// pages/pets/index.js
const app = getApp()

Page({
  data: {
    items: [
      {
        type: 'filter',
        // label: 'Filter',
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
                value: 'mini'
              },
              {
                label: 'Small',
                value: 'small'
              },
              {
                label: 'Medium',
                value: 'medium',
              },
              {
                label: 'Large',
                value: 'large'
              },
            ],
					},
					{
            type: 'radio',
            label: 'Vaccinated',
            value: 'vaccinated',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true,
              },
              {
                label: 'Vaccinated',
                value: 'true',
              },
              {
                label: 'Unvaccinated',
                value: 'false',
              },
            ],
          },
					{
            type: 'radio',
            label: 'Adopt or Foster',
            value: 'adoptable',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true,
              },
              {
                label: 'Open to Both',
                value: 'false',
              },
              {
                label: 'Adopt-Only',
                value: 'true',
              },
            ],
          }
        ],
        groups: ['001', '002', '003', '004', '005'],
      },
		], 
  },

	
  onLoad(options) {
    this.setData({
			content: wx.getStorageSync('content')
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
    this.setData({
			content: app.globalData.content
		})
    if (typeof this.getTabBar === 'function' && this.getTabBar()){
			console.log('getTabBar-->', this.getTabBar())
      this.getTabBar().setData({
				selected: 0 
			})
    }
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
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        page.setData({
          pets: res.data,
					content: app.globalData.content,
					bookings: res.data.my_booking,
				})
			}
		})

		// wx.request({
		// 	header: app.globalData.header,
		// 	url: `${app.globalData.baseURL}/pets/${id}/bookings`,
		// 	success(res) {
		// 		if (res.statusCode === 200) {
		// 			const favorites = res.data.bookings_count;

		// 			page.setData({
		// 				favorites: favorites,
		// 			})
		// 		}
		// 	}
		// })
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
          } else if (n.value === 'vaccinated') {
            params.vaccinated = n.children
            .filter((n) => n.checked)
            .map((n) => n.value)
            .join(',')
          } else if (n.value === 'adoptable') {
            params.adoptable = n.children
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