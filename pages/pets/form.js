// pages/pets/form.js
const app = getApp()

Page({
  data: {
    imageUrl: [], 
    name: '',
    value1: '',
    value2: "",
    value3: "",
    neutered: false,
    vaccination: false,
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
  onLoad(options) {
  },
  onReady() {
  },
  onShow() {
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
      [`displayValue${key}`]: values.label,
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

  uploadImg(e) {
    const { file, fileList } = e.detail
    console.log(e.detail)
    // wx.upload({
    //   url: `${app.globalData.baseURL}/pets/${id}/upload`,

    // })
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
  },

  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },

  onImgRemove(e) {
    const { file, fileList } = e.detail
    wx.showModal({
      content: 'Delete this image？',
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
     console.log("from submit button -->", e)
     const page = this
     console.log('header:', app.globalData.header)
     let pet = page.data.formData
     page.setData({pet})
     console.log("this is the data to send back -->", page.data.pet)
   
     // UPDATE FUNCTION
    if (page.data.pet.id !== undefined && page.data.pet.id !== null) {
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${page.data.pet}`,
        method: 'PUT',
        data: {
          pet: pet
        },
        success(res) {
          console.log('update success?', res)
          // page.upload(page.data.pet.id)
          page.setData({resetForm: true})
          wx.switchTab({
            url: '/pages/pets/index',
          })

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
          } else if (res.statusCode === 500) {
            wx.showModal({
              title: "Sorry, please try again!",
              showCancel: false,
              confirmText: 'OK'
            })
          } else {
            wx.showToast({
              title: "Success!",
              duration: 2000
            })  
            // Calling upload image function
            const id = res.data.pet.id
            page.setData({resetForm: true})
            // page.upload(id)
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