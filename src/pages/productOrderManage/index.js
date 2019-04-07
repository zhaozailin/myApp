import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import MyOrderList from "../myOrderList";
import MySubscribeList from "../mySubscribeList";
import ChargeRecordList from "../chargeRecordList";
import ConsumeRecordList from "../consumeRecordList";

export default class ProductOrderManage extends Component {
  state = {
    current: 0,
    tabList: []
  }

  componentDidMount = () => {
    // 管理员
    if (Taro.getStorageSync('auth') === 1) {
      this.setState({
        tabList: [
          { title: '充值记录' },
          { title: '消费记录' }
        ]
      })
    }
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render() {
    // const tabList = [{ title: '我的订单' }, { title: '我的预约' }, { title: '充值记录' }, { title: '消费记录' }]
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={this.state.tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            {Taro.getStorageSync('auth') === 1 &&  <ChargeRecordList/>}
            {Taro.getStorageSync('auth') === 2 &&  <MyOrderList/>}
            {Taro.getStorageSync('auth') === 3 &&  <MyOrderList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {Taro.getStorageSync('auth') === 1 &&  <ConsumeRecordList/>}
            {Taro.getStorageSync('auth') === 2 &&  <MySubscribeList/>}
            {Taro.getStorageSync('auth') === 3 &&  <MySubscribeList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {Taro.getStorageSync('auth') === 2 &&  <MySubscribeList/>}
            {Taro.getStorageSync('auth') === 3 &&  <MySubscribeList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            {Taro.getStorageSync('auth') === 2 &&  <MySubscribeList/>}
            {Taro.getStorageSync('auth') === 3 &&  <MySubscribeList/>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
