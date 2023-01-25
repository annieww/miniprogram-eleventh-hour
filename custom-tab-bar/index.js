let app = getApp();
Component({
  data: {
    selectedID: 0,
    color: "#404040",
    selectedColor: "#E15B99",
    list: [{
      pagePath: "/pages/pets/index",
      iconPath: "/images/home.png",
      selectedIconPath: "/images/home-active.png"
    }, {
      pagePath: "/pages/admin/faq",
      iconPath: "/images/faq.png",
      selectedIconPath: "/images/faq-active.png"
      }, {
      pagePath: "/pages/user/profile",
      iconPath: "/images/paw.png",
      selectedIconPath: "/images/paw-active.png"
      }, {
      pagePath: "/pages/pets/form",
      iconPath: "/images/add.png",
      selectedIconPath: "/images/add-active.png"
      }, {
      pagePath: "/pages/admin/profile",
      iconPath: "/images/admin.png",
      selectedIconPath: "/images/admin-active.png"       
      }
    ]
  },

  methods: {
    switchTab: function (e) {
      console.log('selectedTabIndex: ', this.data.selectedTabIndex)
      const data = e.currentTarget.dataset
      console.log('switching to tab ',data)
      const url = data.path
      this.setData({
        selectedTabIndex: data.index
      })
      wx.switchTab({url: url})
    }
  }
})