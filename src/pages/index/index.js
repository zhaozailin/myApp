import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.less'
import LoginRegister from "../loginRegister";

export default class Index extends Component {
  state = {
  }

  config = {
    navigationBarTitleText: '授权'
  }

  componentWillMount() {
    // 判断用户是否已经授权
    Taro.getSetting().then((res) => {
      // 已授权
      if (res.authSetting['scope.userInfo']) {

        // 已登录
        // Taro.redirectTo({
        //   url: '/pages/main/index'
        // })

        // 未登录
        Taro.redirectTo({
          url: '/pages/loginRegister/index'
        })
      }
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  enter = () => {
    Taro.getUserInfo().then(() => {
      Taro.redirectTo({
        url: '/pages/main/index'
      })
    }, () => {
      Taro.showToast({title: '请先进行授权操作', icon: 'none'})
    })
  }

  render() {
    return (
      <View className='auth-wrap'>
        <Button className='auth-btn' openType='getUserInfo'>授权</Button>
        <Text className='auth-info'>如已授权，点击进入按钮</Text>
        <Button className='auth-enter-btn' type='primary' onClick={this.enter}>点击进入</Button>
      </View>
    )
  }
}
