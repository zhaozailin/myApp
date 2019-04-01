import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import ProductOrderManage from '../productOrderManage'
import './index.less'
import MyShop from "../myShop";

export default class Main extends Component {
  state = {
    current: 0,
  }
  config = {
    navigationBarTitleText: '工单管理'
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
        {this.state.current === 0 && <ProductOrderManage/>}
        {this.state.current === 2 && <MyShop/>}
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
