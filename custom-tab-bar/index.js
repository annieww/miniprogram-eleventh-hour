let app = getApp();
Component({
  data: {
		selected: 0,
    color: "#404040",
		selectedColor: "#E15B99", 
		allList: [{
			adminList: [{
			pagePath: "/pages/pets/index",
      iconPath: "/images/home.png",
			selectedIconPath: "/images/home-active.png"
			}, {
			pagePath: "/pages/admin/faq",
			iconPath: "/images/faq.png",
			selectedIconPath: "/images/faq-active.png"
			}, {
			pagePath: "/pages/pets/form",
      iconPath: "/images/add.png",
      selectedIconPath: "/images/add-active.png"
			}
			// {
			// pagePath: "/pages/admin/profile",
			// iconPath: "/images/admin.png",
			// selectedIconPath: "/images/admin-active.png"
			// }
		],

			userList: [{
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
			}]
		}],
		list: []
	},
	
	attached() {
		const role = wx.getStorageSync('role')
		console.log(role)
		if (role === "admin") {
			this.setData({
				list: this.data.allList[0].adminList
			})
		} else {
			this.setData({
				list: this.data.allList[0].userList
			})
		}
	},

  methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
				selected: data.index
      })
			wx.switchTab({url: url})
    }
	}
})