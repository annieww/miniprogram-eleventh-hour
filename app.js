// app.js
import event from './utils/event';
wx.event = event;
import zh from '/utils/zh'
import en from '/utils/en' 

App({
  globalData: {
    userInfo: '',
    header: null,
    user: null,
    baseURL: "http://localhost:3000/api/v1", 
		language: wx.getStorageSync('language'),
		routerList: []
  }, 

  onLaunch() {
    // obtain user current setting
    // wx.getSetting({
    //   success: res => {
    //     console.log(res.authSetting);
    //     if(res.authSetting['scope.userInfo']){
    //       console.log('already authorized -- obtain user info')
    //         // obtain user info
    //         wx.getUserInfo({
    //           success: data => {
    //             console.log(data.userInfo);
    //             // save to global data
    //             this.globalData.userInfo = data.userInfo;
    //           }
    //         })
    //     } else {
    //       console.log('not authorized yet -- ask user to authorize')
    //     }
    //   }
    // })
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
    }),
     // 
     this.updateContent()
  },
  updateContent() {
    let lastLanguage = wx.getStorageSync('language') // identify the current language
    if (lastLanguage == 'en') {
      this.globalData.content = en.content // sets the language according to current language setting
      wx.setStorageSync('language', 'en') // keeps the language setting
    } else {
      this.globalData.content = zh.content
      wx.setStorageSync('language', 'zh')
    }
  }, 
  changeLanguage() {
    let language = wx.getStorageSync('language') // identify the current language
    if (language == 'zh') {
      wx.setStorageSync('language', 'en') // change the language
    } else {
      wx.setStorageSync('language', 'zh')
    }
    this.updateContent()
  }
})
