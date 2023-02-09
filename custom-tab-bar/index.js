let app = getApp();
Component({
  data: {
    // selectedID: 0,
    // color: "#404040",
    // selectedColor: "#E15B99",
    // list: [{
    //   pagePath: "/pages/pets/index",
    //   iconPath: "/images/home.png",
    //   selectedIconPath: "/images/home-active.png"
    // }, {
    //   pagePath: "/pages/admin/faq",
    //   iconPath: "/images/faq.png",
    //   selectedIconPath: "/images/faq-active.png"
    //   }, {
    //   pagePath: "/pages/user/profile",
    //   iconPath: "/images/paw.png",
    //   selectedIconPath: "/images/paw-active.png"
    //   }, {
    //   pagePath: "/pages/pets/form",
    //   iconPath: "/images/add.png",
    //   selectedIconPath: "/images/add-active.png"
    //   }, {
    //   pagePath: "/pages/admin/profile",
    //   iconPath: "/images/admin.png",
    //   selectedIconPath: "/images/admin-active.png"       
    //   }
		// ]
		routerList:[],
    isAdmin: true
  },

  methods: {
    switchTab: function (e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selectedTabIndex: data.index
      })
      wx.switchTab({url: url})
		}, 
		onChange(event) {
			console.log('selectedTabIndex: ', this.data.selectedTabIndex)
			this.setData({ selectedTabIndex: event.detail });
		},
		loadPage(event) {
			wx.switchTab({
				url: event.target.dataset.url,
			})
		}
	},
	
	properties: {
		selectedTabIndex: {
			type: Number,
			value: 0
		}
	},

	lifetimes: {
		attached() {
			this.setData({ routerList: getApp().globalData.routerList});
			console.log('routerList -->', this.data.routerList)
		}
	}
})