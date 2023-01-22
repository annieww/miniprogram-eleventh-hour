// pages/pets/form.js
const app = getApp()

Page({
  data: {
    imageUrl: ["/images/admin-active.png"], 
    name: '',
    value1: "",
    value2:"",
    value3: "",
    age:'',
    neutered: false,
    vaccinated: false,
    special_need: false,
    options1: ['Female', 'Male'],
    displayValue1: 'select',
    options2: ['Dog', 'Cat', 'Other'],
    displayValue2: 'select',
    options3: ['Mini', 'Small', 'Medium', 'Large'],
    displayValue3: 'select',
    // resetForm: true, 
    formData: {},
    character: "",
    fileList: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
  },
  resetForm() {
    this.setData({formData: {}})
  },
  // listenerBtnChooseImage: function () {
  //   const page = this
  //   page.setData({resetForm: false})
  //   // Upload an image
  //   wx.chooseImage({
  //     count: 3,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {
  //       console.log('img uploaded', res)
  //       page.setData({
  //         src: res.tempFilePaths
  //       })
  //     }
  //   })
  //  },

  // Pop-up selection for Gender, Species, and Size

   setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    console.log(`onConfirm${index}`, e.detail)
  },
  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },

  // Switch Area for Age & Health Related Info
  onChange(field, e) {
    this.setData({
      [field]: e.detail.value,
    })
  },
  inputNeutered(e) {
    this.onChange('neutered', e)
  },
  inputVaccinated(e) {
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
    this.onChange('character', e)
  },

  uploadImg(e) {
    const { file, fileList } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
    // Controlled state should set fileList
    this.setData({ fileList })
  },

  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },

  onRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: '确定删除？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            fileList: fileList.filter((n) => n.uid !== file.uid),
          })
        }
      },
    })
  },

   create(e) {
     console.log("from create button -->", e)
     const page = this
     console.log('header:', app.globalData.header)
     let pet = page.data.formData
     page.setData({pet})
     console.log("this is the data to send back -->", page.data.pet)

    // This is when pet id is detected or Update 

    // if (page.data.pet.id !== undefined && page.data.pet.id !== null) {
    //   wx.request({
    //     header: app.globalData.header,
    //     url: `${app.globalData.baseURL}/trips/${page.data.pet}`,
    //     method: 'PUT',
    //     data: {
    //       pet: pet
    //     },
        // success(res) {
        //   console.log('update success?', res)
        //   page.upload(page.data.pet.id)
        //   page.setData({resetForm: true})
          // wx.switchTab({
          //   url: '/pages/trips/landing',
          // })

      //     wx.navigateBack({
      //       delta: 0,
      //     })
      //   }
      // })
    // } else {

      // This is to create new pet
      console.log("Create: trip", trip)
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets`,
        method: 'POST',
        data: {
          pet: pet
        },
        success(res) {
          console.log('update success?', res)
          if (res.statusCode === 422) {
            wx.showModal({
              title: 'Sorry, please try again!',
              content: res.data.errors.join(', '),
              showCancel: false,
              confirmText: 'OK'
            })
          } else if (res.statusCode === 500) {
            wx.showModal({
              title: "Sorry, please try again!",
              showCancel: false,
              confirmText: 'OK'
            })
          } else {
            wx.showToast({
              title: "Successfully created pet!",
              duration: 2000
            })  
            // Calling upload image function
            const id = res.data.pet.id
            page.setData({resetForm: true})
            page.upload(id)
          }
        },
        fail(error) {
          console.log({error})
        }
      })
    },
  
  // upload(id) {
  //   const page = this
  //   wx.uploadFile({
  //     url: `${app.globalData.baseURL}/pets/${id}/upload`,
  //     filePath: 'page.data.src[]',
  //     header: page.globalData.header,
  //     name: 'image',
  //     success(res) {
  //       wx.navigateTo ({
  //         url: `pages/pets/${id}`
  //       })
  //       console.log(res)
  //     }
  //   })
  // },

  goBack() {
    wx.redirectTo({
      url: '/pages/admin/profile',
    })
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})