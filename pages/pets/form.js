// pages/pets/form.js
const app = getApp()

Page({
  data: {
    name: '',
    value1: '',
    value2: '',
		value3: '',
    neutered: false,
    vaccinated: false,
    special_need: false,
    adoptable: true,
    options1: ['female', 'male'],
    options2: ['dog', 'cat', 'other'],
    options3: ['mini', 'small', 'medium', 'large'],
    resetForm: true, 
    src: "/images/image.png",
    formData: {},
    description: "",
    fileList: []
	},
	
  onLoad(options) {
		wx.setStorageSync('new', true)
		console.log('form onLoad, options ->', options)
		wx.setNavigationBarTitle({
			title: 'Post a Pet',
		})
	},
	
  onReady() {
  },

  resetForm() {
    this.setData(
      {formData: {} , src: "/images/image.png"})
  },
  // Pop-up selection for Gender, Species, and Size
  setValue(values, key, field) {
    let { formData } = this.data
    formData[field] = values.value
    this.setData({
      [`value${key}`]: values.value, 
      formData
    })
  },

  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    const { field } = e.currentTarget.dataset
    this.setValue(e.detail, index, field)
    console.log(`onConfirm${index}`, e.detail, field)
  },
  
  onShow() {
    this.resetForm()
		const page = this
		let { formData } = page.data

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()){
      this.getTabBar().setData({
        selected: 2
      })
    }
    this.setData({
      content: app.globalData.content
		})

		if(wx.getStorageSync('new')){
			page.setData({formData})
		}
		const id = wx.getStorageSync('editId')
    if (id) {
      console.log('id found -> update')
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${id}`,
        success(res) {
					let data = res.data
					console.log('success onShow, data->', data)
          page.setData({
            formData: res.data.pet,
            src: res.data.pet.image_url
          })
          wx.removeStorageSync('editId')
        }
      })
    } 
  },

  // Switch Area for Age & Health Related Info
  onChange(field, e) {
    let { formData } = this.data
    formData[field] = e.detail.value
    this.setData({      
      [field]: e.detail.value,
      formData 
    })
	},
  inputNeutered(e) {
    this.onChange('neutered', e)
  },
  inputVaccination(e) {
    this.onChange('vaccinated', e)
  }, 
  inputSpecialNeed(e) {
    this.onChange('special_need', e)
  },
  inputAge(e) {
    this.onChange('age', e)
  },
  inputName(e) {
    this.onChange('name', e)
  },
  inputAddInfo(e) {
    this.onChange('description', e)
  },

  chooseImage: function () {
    const page = this
    page.setData({resetForm: false})
    // Upload an image
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log('img successfully uploaded', res)
        page.setData({
          src: res.tempFilePaths
        })
      }
    })
   },

  upload(id){
    const page = this
    wx.uploadFile({
      url: `${app.globalData.baseURL}/pets/${id}/upload`,
      filePath: page.data.src[0],
      header: app.globalData.header,
      name: 'image',
      success (res){
        page.setData({resetForm: true})
      }
    })
  },

  create(e) {
		wx.setStorageSync('new', true)
		console.log('from create button --->',e)
		const page = this
		console.log('header:', app.globalData.header)
    let pet = page.data.formData
    page.setData({pet})
    if (pet.adoptable === undefined || pet.adoptable === null) {
      pet.adoptable = true;
    }
    console.log("this is the data to send back, page.data.pet -->", page.data.pet)
		console.log('page.data ->', page.data)
		 // UPDATE FUNCTION
		 // Find Pet ID
    if (page.data.pet.id !== undefined && page.data.pet.id !== null) {
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${page.data.pet.id}`,
        method: 'PUT',
        data: {
          pet: pet
        },
        success(res) {
          console.log('update success?', res)
          page.upload(page.data.pet.id)
          page.setData({resetForm: true})
          wx.switchTab({
            url: 'index'
          })
        }
      })
    } else {
      // CREATE FUNCTION
      console.log("Creating new pet post", pet)
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets`,
        method: 'POST',
        data: {
          pet: pet
        },
        success(res) {
          if (res.statusCode === 422) {
            wx.showModal({
              title: 'Sorry, please try again!',
              content: res.data.errors.join(', '),
              showCancel: false,
              confirmText: 'OK'
            })
          } else {
            wx.showToast({
              title: "Success!",
              duration: 2000
            })  
            // Calling IMG UPLOAD FUNCTION
            const id = res.data.pet.id
            page.setData({resetForm: true})
            page.upload(id)
            wx.switchTab({
              url: 'index',
            })
          }
        },
        fail(error) {
          console.log({error})
        }
      })
    }
  },

  onHide() {
  },

  onUnload() {
		this.resetForm()
  },

  onPullDownRefresh() {
  },
  onReachBottom() {
  },

  onShareAppMessage() {
  }
})