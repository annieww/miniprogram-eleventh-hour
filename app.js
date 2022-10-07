// app.js
import event from './utils/event';
wx.event = event;

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    const app = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("Hello from app.js: res", res)
        wx.request({
          url: `${app.globalData.baseURL}/login`,
          method: 'post',
          data: { code: res.code }, // pass code in request body
          success(loginRes) {
            console.log("Hello from app.js: loginRes",loginRes) 
            app.globalData.user = loginRes.data.user // save in globalData, so we can use them throughout the MP
            app.globalData.header = loginRes.data.headers
            console.log("Hello from app.js: app.globalData",app.globalData)
            event.emit('loginFinished')
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    header: null,
    user: null,
    baseURL: "http://localhost:3000/api/v1"
  }
})
