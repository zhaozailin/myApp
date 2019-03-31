import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.less'

export default class Main extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <Text>首页</Text>
      </View>
    )
  }
}
