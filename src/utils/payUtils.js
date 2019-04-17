import Taro from '@tarojs/taro'

export const pay = (totalFee, productDesc, callback) => {
  wx.login({
    success: (result) => {
      let code = result.code;
      Taro.request({
        data: {
          code: code,
          totalFee: totalFee,
          productDesc: productDesc,
        },
        url: 'http://47.110.242.98:8000/pay',
        success: (r) => {
          let payModel = r.data;
          wx.requestPayment({
            'timeStamp': payModel.timestamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'MD5',
            'paySign': payModel.paySign,
            'success': function () {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              callback();
            },
            'fail': function (res) {
            }
          })
        }
      })
    }
  })
}

export const getOpenId = (callback) => {
  wx.login({
    success: (result) => {
      let code = result.code;
      Taro.request({
        data: {
          code: code,
        },
        url: 'http://localhost:8000/pay',
        success: (r) => {
          callback(r.data.openid)
        }
      })
    }
  })
}
