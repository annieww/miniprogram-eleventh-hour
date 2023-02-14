const app = getApp()
Page({
  data: {
			faqList: [
				{
					question: 'Who are EHR?',
					answer: 'We are a group of volunteers dedicated to rescuing animals in need, particularly those that are abandoned, abused, neglected, or in danger of being euthanized in Shanghai. We work in partnership with animal shelters and other organizations to provide medical care, foster homes, and adoption services for rescued animals. Our goal is to find loving, permanent homes for rescued animals and to advocate for animal welfare and responsible pet ownership.'
				},
				{
					question: 'What should you know about adopting pets?',
					answer: "1.Commitment: Adopting a pet is a long-term commitment, so be prepared to provide the necessary care and attention for the animal's entire life.2.Time and energy: Pets require time and energy, so make sure you have enough time in your schedule to devote to them. Different pets have different needs, so research the specific requirements of the pet you want to adopt. 3.Living situation: Consider your living situation and make sure it is suitable for the type of pet you want to adopt. Some pets require a lot of space, while others are more adaptable to smaller living environments."
				}
			],
			isOpen: [false, false],
			// One boolean for each FAQ item, used to control its state
			newQuestion: "",
			newAnswer: "", 
			showAddForm: false, 
			isAdmin: false
  },

  onLoad(options) {
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
		newFaqList.splice(index, 1);
		this.setData({ faqList: newFaqList });
		wx.setStorageSync('faqData', this.data.faqList)
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
    this.setData({
			content: app.globalData.content, 
			faqList: wx.getStorageSync('faqData')
		})
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