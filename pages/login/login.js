// pages/login/login.js
const app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    user: {}
  },
  onLoad: function() {
    const that = this
  },
  goLogin: function() {
    let that = this
    let user = wx.getStorageSync('user')
    if (!user) {
      wx.switchTab({
        url: '/pages/pets/index',
      })
    } else {
      that.setData({
        user: user
      })
      wx.switchTab({
        url: '/pages/pets/index',
      })
    }
  },
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