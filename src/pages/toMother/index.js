import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import {getOpenId} from "../../utils/payUtils";
import './index.less'

export default class ToMother extends Component {
  state = {
    openId: '',
    shopId: '',
    nickname: '',
    avatarUrl: '',
    // 微信授权，1-已授权，0-未授权，-1-空白视图
    weAuth: -1
  }

  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() {
    this.setState({
      shopId: this.$router.params.shopId
    })
    // 获取openId
    getOpenId(openId => {
      // 判断用户是否已经授权
      Taro.getSetting().then((res) => {
        // 已授权
        if (res.authSetting['scope.userInfo']) {
          // 获取登录用户信息
          Taro.getUserInfo().then((res2) => {
            console.log(res2)
            this.setState({
              nickname: encodeURIComponent(res2.userInfo.nickName),
              avatarUrl: encodeURIComponent(res2.userInfo.avatarUrl),
              openId: openId,
              weAuth: 1,
            })
          })
        }
        else {
          Taro.showToast({title: '请先进行授权操作', icon: 'none'})
          this.setState({
            weAuth: 0,
            openId: openId
          })
        }
      })
    })

  }

  enter = () => {
    Taro.getUserInfo().then((res) => {
      console.log(res.userInfo.avatarUrl)
      this.setState({
        nickname: encodeURIComponent(res.userInfo.nickName),
        avatarUrl: encodeURIComponent(res.userInfo.avatarUrl),
        weAuth: 1,
      })
    }, () => {
      Taro.showToast({title: '请先进行授权操作', icon: 'none'})
    })
  }

  render() {
    return (
      <View>
        {this.state.weAuth === 0 &&
        <View className='auth-wrap'>
          <Button className='auth-btn' openType='getUserInfo'>授权</Button>
          <Text className='auth-info'>如已授权，点击进入按钮</Text>
          <Button className='auth-enter-btn' type='primary' onClick={this.enter}>点击进入</Button>
        </View>
        }
        {this.state.weAuth === 1 && <web-view src={'https://1wang.xyz?r=' + Date.now() + '&openId=' + this.state.openId + '&shopId=' + this.state.shopId +'&nickname=' + this.state.nickname + '&avatarUrl=' + this.state.avatarUrl + '#/main'}/>}
      </View>
    )
  }
}
