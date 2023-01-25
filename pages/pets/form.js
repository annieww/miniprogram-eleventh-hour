// pages/pets/form.js
const app = getApp()

Page({
  data: {
    name: '',
    value1: '',
    value2: '',
    value3: '',
    neutered: false,
    vaccination: false,
    special_need: false,
    options1: ['Female', 'Male'],
    options2: ['Dog', 'Cat', 'Other'],
    options3: ['Mini', 'Small', 'Medium', 'Large'],
    resetForm: true, 
    src: "/images/camera.png",
    formData: {},
    character: "",
    fileList: []
  },
  onLoad(options) {
  },
  onReady() {
  },
  onShow: function() {
    const page = this
    if (page.data.resetForm) this.resetForm();
    const id = wx.getStorageSync('editId')
    console.log("from storage", id)
    if (id) {
      console.log('id found -> get pet data from server (to show in form)')
      wx.showToast({
        title: 'Loading...',
        icon: 'loading',
        duration: 1500
      })
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${id}`,
        method: 'GET',
        success(res) {
          page.setData({
            formData: res.data.pet,
            src: res.data.pet.image_url
          })
        },
      })
      wx.removeStorageSync('editId')
    }
  },

  resetForm() {
    this.setData({formData: {}})
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
    this.onChange('vaccination', e)
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
     const page = this
     let pet = page.data.formData
     page.setData({pet})
     console.log("this is the data to send back -->", page.data.pet)
   
     // UPDATE FUNCTION
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
          // wx.switchTab({
          //   url: '/pages/pets/index',
          // })
          wx.navigateBack({
            delta: 0,
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
            wx.navigateTo({
              url: '/pages/pets/form'
            })
          }
        },
        fail(error) {
          console.log({error})
        }
      })
    }
  },

  // goBack() {
  //   wx.redirectTo({
  //     url: '/pages/admin/profile',
  //   })
  // },
 
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