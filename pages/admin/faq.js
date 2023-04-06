const the_md5 = require("../../utils/md5");
var questionTxt = "";
var answerTxt = "";
const app = getApp()
Page({
  data: {
			faqList: [],
			isOpen: [false, false],
			// One boolean for each FAQ item, used to control its state
			newQuestion: "",
			newAnswer: "", 
			showAddForm: false, 
			isAdmin: false,
			translateResult: "",  
			showTranslation: false,
			questionTxt: "",
			answerTxt: "",
			translateResult: "",
  },

  onLoad(options) {
	},

	getData(e) {
		const page = this
		wx.request({
      url: `${app.globalData.baseURL}/faqs`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
				// const questionTxt = res.data[index].question
				// const answerTxt = res.data[index].answer
        page.setData({
          faqList: res.data,
					content: app.globalData.content,
					// questionTxt: res.data[index].question,
					// answerTxt: res.data[index].answer
				})
				console.log('from FAQ, res.data->', res.data)
      }
    })
	},

	//清空  
	clearBut: function (e) {    
		this.setData({      
			txt: '',      
			translateResult: '' ,
			showTranslation: false   
		})  
		console.log('clearBut e, ', e)
	},  

	//翻译  
	translateBut: function (e) {    
		var appid = '20230403001627276';    
		var key = 'LVUwcw1FxpqGTBhhGK06';    
		var salt = (new Date).getTime();    
		var from = 'auto';    
		var to = 'auto';    
		from = 'en';
		to = 'zh';

		let that = this;    
		console.log('that.data.faqList from translateBut', that.data.faqList)
		const index = e.currentTarget.dataset.index;
		const questionTxt = that.data.faqList[index].question;
		const answerTxt = that.data.faqList[index].answer;
		var viewText = questionTxt + answerTxt; 
		var query = viewText;
		var str1 = appid + query + salt + key;    
		var sign = the_md5.MD5(str1);    

		console.log('from translateBut, e', e)
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

	toggleAnswer(e) {
		const index = e.currentTarget.dataset.index
		const newIsOpen = [...this.data.isOpen];
    newIsOpen[index] = !newIsOpen[index];
    this.setData({ isOpen: newIsOpen });
	},
	// addFAQ() {
	// 	const newFaq = {
	// 		question: this.data.newQuestion,
	// 		answer: this.data.newAnswer
	// 	};

	// 	const newFaqList = [ ...this.data.faqList, newFaq]
	// 	const newIsOpen = [ ...this.data.isOpen, false]
		
	// 	this.setData({
	// 		faqList: newFaqList,
	// 		isOpen: newIsOpen,
	// 		newQuestion: "",
	// 		newAnswer: "", 
	// 		showAddForm: false
	// 	});
  //   wx.setStorageSync('faqData', newFaqList)
  //   wx.showToast({
  //     title: 'FAQ added',
  //     duration: 1000
  //   })
	// },
	addFaq(e){
		const page = this
		const newFaq = {
			question: this.data.newQuestion,
			answer: this.data.newAnswer
		}
		wx.request({
			header: app.globalData.header,
			url: `${app.globalData.baseURL}/faqs`,
			method: 'POST',
			data: {faq: newFaq},
			success(res) {
				page.getData()
				page.toggleAddForm()
			},
			fail(error) {
				console.log({error})
			}
		})
	},

	updateNewQuestion(e) {
		this.setData({ newQuestion: e.detail.value});
	},

	updateNewAnswer(e) {
		this.setData({ newAnswer: e.detail.value })
	},

	// deleteFaq(e){
	// 	const index = e.currentTarget.dataset.index
  //   let newFaqList = [ ...this.data.faqList];
  //   wx.showModal({
  //     title: 'Note!',
  //     content: 'Delete this FAQ?',
  //     complete: (res) => {
  //       if (res.cancel) {
  //       }
  //       if (res.confirm) {
  //         newFaqList.splice(index, 1);
  //         this.setData({ faqList: newFaqList });
  //         wx.setStorageSync('faqData', this.data.faqList)
  //         wx.showToast({
  //           title: 'Deleted!',
  //           duration: 1000
  //         })
  //       }
  //     }
  //   })
	// },
	
	deleteFaq(e){
		const page = this
		const index = e.currentTarget.dataset.index
		let id = page.data.faqList[index].id
		console.log('from deleteFaq, e', e)
		console.log("delete id", id)
    wx.showModal({
      title: 'Note',
			content: 'Delete this FAQ?',
			confirmText: "Yes",
			cancelText: "No",
      complete: (res) => {
        if (res.cancel) {
        }
        if (res.confirm) {
					wx.request({
						url: `${app.globalData.baseURL}/faqs/${id}`,
						method: 'DELETE',
						header: app.globalData.header,
            success(res) {
							console.log("deleted")
							page.getData()
						},
						error() {
							console.log({error})
						}
					}) 
        }
      }
    })
	},

	toggleAddForm(e){
		this.setData({ showAddForm: !this.data.showAddForm })
	},
	showForm(e){
		this.setData({ showAddForm: true})
	},

  onReady() {
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 1
      })
		}
		this.setData({ content: app.globalData.content })
		this.getData()
		const role = wx.getStorageSync('role')
		if (role == 'admin') {
			this.setData({
				isAdmin: true
			})
		}
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

  }
})