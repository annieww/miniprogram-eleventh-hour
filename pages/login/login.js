// pages/login/login.js
const app = getApp().globalData;
Page({
  data: {
    remind: '加载中',
    angle: 0,
    user: {}
  },
  onLoad: function() {
    const that = this
	},
	login(e){
		const type = e.target.dataset.type
		if(type == 2){
			app.routerList = [
				{
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
				}, {
					pagePath: "/pages/admin/profile",
					iconPath: "/images/admin.png",
					selectedIconPath: "/images/admin-active.png"       
				}
			]
			wx.reLaunch({
				url: '/pages/admin/profile'
			})
		} else {
			app.routerList = [
				{
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
				}
			]
			wx.reLaunch({
				url: '/pages/pets/index'
			})
		}
	},
  // goLogin: function() {
  //   let that = this
  //   let user = wx.getStorageSync('user')
  //   if (!user) {
  //     wx.switchTab({
  //       url: '/pages/pets/index',
  //     })
  //   } else {
  //     that.setData({
  //       user: user
  //     })
  //     wx.switchTab({
  //       url: '/pages/pets/index',
  //     })
  //   }
  // },
  onReady: function() {
    const that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      const angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
})