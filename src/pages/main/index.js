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
      <View className='m-wrap'>
        <Text>首页</Text>
        <View className='m-bottom-wrap'>
          <Button type='primary' size='mini'>工单管理</Button>
          <Button type='primary' size='mini' className='m-bottom-btn'>门店管理</Button>
          <Button type='primary' size='mini' className='m-bottom-btn'>我的</Button>
        </View>
      </View>
    )
  }
}
