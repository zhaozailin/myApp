import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  state = {
  }

  config = {
    navigationBarTitleText: '授权'
  }

  componentWillMount() {
    Taro.redirectTo({
      url: '/pages/loginRegister/index'
    })
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}
