import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput, AtButton} from 'taro-ui'
import {login} from '../../request/user'
import './index.less'
import authCode from "../../config/authCode";

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

  // 登录之后的跳转
  afterLogin = () => {
    let url;

    // 管理员
    if (Taro.getStorageSync('auth') === authCode.manager) {
      url = '/pages/chargeRecordList/index'
    }
    // 店长
    else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      url = '/pages/myOrderList/index'
    }
    // 员工
    if (Taro.getStorageSync('auth') === authCode.employe) {
      url = '/pages/mySubscribeList/index'
    }

    Taro.redirectTo({
      url
    })
  }

  toLogin = () => {
    if (this.checkLogin()) {
      login({
        phone: this.state.username,
        password: this.state.password
      }).then((result) => {
        Taro.showToast({title: '登录成功', icon: 'none'})

        Taro.setStorageSync('auth', result.auth)
        Taro.setStorageSync('shopId', result.shopId)
        Taro.setStorageSync('username', this.state.username)

        this.afterLogin();
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
