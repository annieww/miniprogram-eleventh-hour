const app = getApp()
Page({
  data: {
			faqList: [],
			isOpen: [false, false],
			// One boolean for each FAQ item, used to control its state
			newQuestion: "",
			newAnswer: "", 
			showAddForm: false, 
			isAdmin: false
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
        page.setData({
          faqList: res.data,
					content: app.globalData.content,
				})
      }
    })
	},

	toggleAnswer(e) {
		const index = e.currentTarget.dataset.index
		const newIsOpen = [...this.data.isOpen];
    newIsOpen[index] = !newIsOpen[index];
    this.setData({ isOpen: newIsOpen });
	},
	addFAQ() {
		const newFaq = {
			question: this.data.newQuestion,
			answer: this.data.newAnswer
		};

		const newFaqList = [ ...this.data.faqList, newFaq]
		const newIsOpen = [ ...this.data.isOpen, false]
		
		this.setData({
			faqList: newFaqList,
			isOpen: newIsOpen,
			newQuestion: "",
			newAnswer: "", 
			showAddForm: false
		});
    wx.setStorageSync('faqData', newFaqList)
    wx.showToast({
      title: 'FAQ added',
      duration: 1000
    })
	},

	updateNewQuestion(e) {
		this.setData({ newQuestion: e.detail.value});
	},

	updateNewAnswer(e) {
		this.setData({ newAnswer: e.detail.value })
	},

	deleteFaq(e){
		const index = e.currentTarget.dataset.index
    let newFaqList = [ ...this.data.faqList];
    wx.showModal({
      title: 'Note!',
      content: 'Delete this FAQ?',
      complete: (res) => {
        if (res.cancel) {
        }
        if (res.confirm) {
          newFaqList.splice(index, 1);
          this.setData({ faqList: newFaqList });
          wx.setStorageSync('faqData', this.data.faqList)
          wx.showToast({
            title: 'Deleted!',
            duration: 1000
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()){
      this.getTabBar().setData({
        selected: 1
      })
		}
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