// pages/pets/show.js
const the_md5 = require("../../utils/md5");
var selectText = '';
var descripTxt = '';
const app = getApp()
Page({

  data: {
		neuteredDisplay: '',
		vaccinatedDisplay:'',
		specialNeedDisplay: '',
		adoptOnly: '', 
		current_user: {}, 
		userImage: '',
		userName: '',
    userWechatId: '',
    isBooker: false,
		bookingId: null,
		showWindow: false,
		favorites: '', 
		descripTxt: "",
		translateResult: "",    
		// selectArray: [      
		// 	{        
		// 		"id": "10",        
		// 		"text": "English"      
		// 	},      
		// 	{        
		// 		"id": "21",        
		// 		"text": "中文"      
		// 	}
		// ],
    showTranslation: false,
    currentLanguage: wx.getStorageSync('language'),
    ageCompleted: "",
    numberAge: "",
    stringAge: "",
    cnAge:""
	},

	// pressView: function(e){
	// 	var viewText = this.data.descripTxt;
	// 	console.log('from pressView, viewText ', viewText)
	// },
	
	//清空  
	clearBut: function (e) {    
		this.setData({      
			txt: '',      
			translateResult: '' ,
			showTranslation: false   
		})  
	},  

	//翻译  
	translateBut: function () {    
		var appid = '20230403001627276';    
		var key = 'LVUwcw1FxpqGTBhhGK06';    
		var salt = (new Date).getTime();    
		var from = 'auto';    
		var to = 'auto';    
		// if(selectText==="English"){      
		// 	from = 'zh',      
		// 	to = 'en'    
		// 	} else if(selectText==="中文"){      
		// 	from = 'en',      
		// 	to = 'zh'    
		// 	}      
		from = 'en';
		to = 'zh';
		var viewText = this.data.descripTxt; 
		var query = viewText;
		// var query = "apple";
		var str1 = appid + query + salt + key;    
		var sign = the_md5.MD5(str1);    
		let that = this;    
		// if (query === undefined || query === '') {      
		// 	return;    
		// }    
		wx.request({      
			url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',      
			type: 'get',      
			data: {    
				q: query,        
				appid: appid,        
				salt: salt,        
				from: from,        
				to: to,        
				sign: sign      
			},    
			success: function (res) {        
				console.log('from translateBut success, res->', res)    
					that.setData({ 
						showTranslation: true,       
						translateResult: res.data.trans_result[0].dst        
					})      
			},    
		})  
	},  

	//获取要翻译的内容  
	// getInputValue: function (e) {    
	// 	inputTxt = e.detail.value  
	// },  
	//获取翻译类型  
	// select: function(e){    
	// 	selectText = e.detail.text;  
	// },

  onLoad(options) {
		this.setData({
      content: wx.getStorageSync('content'),
      petId: options.id,
      currentLanguage: wx.getStorageSync('language')
    })
    console.log('from onLoad -> ', options)
  },

  onReady() {

  },

  getData() {
		let page = this
    let id = page.options.id
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        if (res.statusCode === 200) {
					const pet = res.data.pet;
          let splitAge = pet.age.split(" ");
          let numberAge = splitAge[0];
          let stringAge;
          if(splitAge[1] !== undefined){stringAge = splitAge[1].toLowerCase()}
          let ageCompleted = splitAge[1] == undefined ? "false" : "true";
          let cnAge; 
          if(stringAge == "years"){
            cnAge = "岁"
          } else if(stringAge == "year"){
            cnAge = "岁"
          } else if(stringAge == "months"){
            cnAge = "个月"
          } else if(stringAge == "month"){
            cnAge = "个月"
          } else {
            cnAge = " "
          }

          let currentLanguage = wx.getStorageSync('language');

					const my_booking = res.data.my_booking;
					const current_user = res.data.current_user;
					const isBooker = my_booking? my_booking.user_id === current_user.id : false;
					// const isAdmin = current_user.admin? true : false;
					const descripTxt = pet.description;
					const isAdmin = current_user.role === "admin";
					let neuteredDisplay = pet.neutered ? 'yes' : 'no';
					let vaccinatedDisplay = pet.vaccinated ? 'yes' : 'no';
					let specialNeedDisplay = pet.special_need ? 'yes' : 'no';
					let adoptOnly = pet.adoptable? 'true': 'false';
          page.setData({
            pet: pet,
            splitAge: splitAge,
            numberAge: numberAge,
            stringAge: stringAge,
            cnAge: cnAge,
            ageCompleted: ageCompleted,
            currentLanguage: currentLanguage,
						neuteredDisplay: neuteredDisplay,
						vaccinatedDisplay: vaccinatedDisplay,
						specialNeedDisplay: specialNeedDisplay,
						adoptOnly: adoptOnly,
						current_user: current_user, 
						isBooker: isBooker,
						isAdmin: isAdmin,
						content: app.globalData.content,
						bookings: res.data.my_booking,
						favorites: res.data.bookings,
						descripTxt: res.data.pet.description
          })
          console.log('from getData, currentLanguage', currentLanguage)
          console.log('from getData, numberAge, stringAge', numberAge, stringAge)
					console.log('from pet/show, res.data->', res.data)
          console.log("isbooker", isBooker, "isAdmin", isAdmin)
        }
      }
		})
  },

  onShow() {
		this.setData({
			content: app.globalData.content
		})
    if (app.globalData.header) {
			this.getData()
    } else {
			wx.event.on('loginFinished', this, this.getData)
    }
	},

	handleGetUserInfo(e) {
		let userInfo = e.detail.userInfo
		if (userInfo) {
			this.setData({
				userName: userInfo.nickName,
				userWechatId: userInfo.openId,
				userImage : userInfo.avatarUrl
			})
		}
		console.log("user info -> ", userInfo)
  },

	clickNeed(e) {
		this.setData({
			showWindow: true,
		})
	},

	hideWindow(e) {
		console.log('e.target.dataset', e.target.dataset)
		if (e.target.dataset.target == "self")
			this.setData({
				showWindow: false,
			})
	},

	preventTouchMove(){},

	toggleBooking(e) {
		let page = this
		page.getData()
    // If pet is already favorited
		if (page.data.isBooker) {
      wx.showModal({
        title: 'Note!',
				content: 'Remove from favorites?',
				confirmText: 'Yes',
				cancelText: 'No',
        complete: (res) => {
          if (res.cancel) {
          }
          if (res.confirm) {
            wx.request({
              url: `${app.globalData.baseURL}/bookings/${page.data.bookings.id}`,
              method: 'DELETE',
              header: app.globalData.header,
              success(res) {
                if (res.statusCode === 200) {
                  console.log("booking removed")
                  page.setData({
                    isBooker: false,
                    bookingId: null
                  })
                  wx.showToast({
                    title: "Unfavorited :(",
                    duration: 1000
                  })  
                } else {
                  console.log("From show.js: status code is", res.statusCode)
                  wx.showToast({
                    title: 'You can favorite a maximum of 10 pets!',
                  })
                }
              }
            })
          }
        }
      })
    // If pet is not favorited yet
		} else {
		let page = this
		let date = Date.now()
		console.log ('From Favorite Btn: page.data', page.data)
		wx.request({
			url: `${app.globalData.baseURL}/pets/${this.data.pet.id}/bookings`,
			header: app.globalData.header,
			method: "POST",
			data: {
				created_at: date, 
				name: this.data.userName,
				wechat_id: this.data.userWechatId,
				image: this.data.userImage
			},
			success(res) {
				if (res.statusCode === 201) {
					page.setData({
						isBooker: true,
						bookingId: res.data.id
					})
					wx.showToast({
						title: 'Favorited!',
						duration: 1000
					})	
					console.log('booking success!, booking.id ->', res.data.booking.id)
					console.log("From show.js : res.data", res.data)
				} else {
					console.log("From show.js: status code is", res.statusCode)
					if (res.statusCode === 422)
					wx.showModal({
						title: "Sorry!",
						content: "You can only favorite a maximum of 10 pets!",
						showCancel: false,
      			confirmText: 'I see',
					})
				}
			}
    })
    }
	},

	handleContact (e) {
		console.log(e.detail.path)
		console.log(e.detail.query)
	},

  edit(e) {
    wx.setStorageSync('editId', this.data.pet.id)
    wx.switchTab({
      header: app.globalData.header,
      url: "form"
    })
    console.log('from pet/show, editId is ->', this.data.pet.id)
  },

  delete(e) {
    let id = this.data.pet.id
    wx.showModal({
      title: 'Note!',
      content: 'Are you sure to delete this post?',
      cancelText: 'No',
      confirmText: 'Yes',
      success(res) {
        if (res.confirm) {
          wx.request({
            header: app.globalData.header,
            url: `${app.globalData.baseURL}/pets/${id}`,
            method: 'DELETE',
            success(res){
              wx.showToast({
                title: 'Deleted!',
                duration: 1000,
                success(resolve) {
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/pets/index',
                    })
                  }, 1000)
                }
              })
            }
          })
        } else {
        }
      }
    })
  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {
    return {
      name: this.data.pet.name,
      image_url: this.data.pet.image_url,
      path: `pages/pets/show?id=${this.options.id}`
    }
  }
})