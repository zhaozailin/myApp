import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtInput, AtButton} from 'taro-ui'
import {login} from '../../request/user'
import './index.less'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  config = {
    navigationBarTitleText: '登录'
  }

  changeUsername = (username) => {
    this.setState({
      username
    })
  }

  changePassword = (password) => {
    this.setState({
      password
    })
  }

  checkLogin = () => {
    if (!this.state.username) {
      Taro.showToast({title: '账号不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.password) {
      Taro.showToast({title: '密码不能为空', icon: 'none'})
      return false;
    }
    return true;
  }

  toLogin = () => {
    wx.login({
      success: (result) => {
        let code = result.code;
        Taro.request({
          data: {
            code: code,
          },
          url: 'http://127.0.0.1:3007/code2Session',
          success: (r) => {
            console.log(r.data);
            let payModel = r.data;
            wx.requestPayment({
              'timeStamp': payModel.timestamp,
              'nonceStr': payModel.nonceStr,
              'package': payModel.package,
              'signType': 'MD5',
              'paySign': payModel.paySign,
              'success': function (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              'fail': function (res) {
              }
            })
          }
        })
      }
    })
  }

  toLogin1 = () => {
    if (this.checkLogin()) {
      login({
        phone: this.state.username,
        password: this.state.password
      }).then((result) => {
        Taro.showToast({title: '登录成功', icon: 'none'})

        Taro.setStorageSync('auth', result.auth)
        Taro.setStorageSync('shopId', result.shopId)

        Taro.redirectTo({
          url: '/pages/main/index'
        })
      })
    }
  }

  render() {
    return (
      <View className='tab-content'>
        <AtInput
          clear
          title='账号'
          type='text'
          placeholder='请输入账号'
          value={this.state.username}
          onChange={this.changeUsername}
          maxLength={11}
        />
        <AtInput
          clear
          title='密码'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.changePassword}
        />
        <View className='login-btn-wrap'>
          <AtButton type='primary' onClick={this.toLogin}>登录</AtButton>
        </View>
      </View>
    )
  }
}
