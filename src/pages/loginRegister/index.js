import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtSegmentedControl} from 'taro-ui'
import './index.less'
import Login from "./Login";
import Register from "./Register";

export default class LoginRegister extends Component {
  state = {
    current: 0,
  }

  config = {
    navigationBarTitleText: '登录',
    "enablePullDownRefresh":true,
  }

  onPullDownRefresh(){
      wx.stopPullDownRefresh()
    // Taro.startPullDownRefresh().then(() => {
    //   Taro.stopPullDownRefresh();
    // })
  }

  componentDidMount() {
    // 本地存储推荐人手机号
    let recommendPhone = this.$router.params.phone;
    Taro.setStorageSync('recommendPhone', recommendPhone)
  }

  switch = (current) => {
    this.setState({current})
  }

  render() {
    return (
      <View className='login-wrap'>
        <AtSegmentedControl
          values={['登录', '注册']}
          onClick={this.switch}
          current={this.state.current}
        />
        {
          this.state.current === 0 ? <Login/> : null
        }
        {
          this.state.current === 1 ? <Register/> : null
        }
      </View>
    )
  }
}
