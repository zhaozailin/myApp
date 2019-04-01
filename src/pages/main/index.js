import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import ProductOrderManager from '../productOrderManager'
import './index.less'

export default class Main extends Component {
  state = {
    current: 0,
  }
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

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        {this.state.current === 0 && <ProductOrderManager/>}
        <AtTabBar
          fixed
          tabList={[
            { title: '工单管理', iconType: 'bullet-list' },
            { title: '门店管理', iconType: 'shopping-bag-2' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
