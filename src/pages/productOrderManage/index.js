import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import MyOrderList from "../myOrderList";
import MySubscribeList from "../mySubscribeList";
import ChargeRecordList from "../chargeRecordList";
import ConsumeRecordList from "../consumeRecordList";
import authCode from "../../config/authCode";

export default class ProductOrderManage extends Component {
  state = {
    current: 0,
    tabList: []
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    // 管理员
    if (Taro.getStorageSync('auth') === authCode.manager) {
      this.setState({
        tabList: [
          { title: '充值记录' },
          { title: '消费记录' }
        ]
      })
    }
    // 店长
    else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      this.setState({
        tabList: [
          { title: '我的订单' },
          { title: '我的预约' },
          { title: '充值记录' },
          { title: '消费记录' }
        ]
      })
    }
    // 员工
    else if (Taro.getStorageSync('auth') === authCode.employe) {
      this.setState({
        tabList: [
          { title: '我的预约' },
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
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={this.state.tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            {Taro.getStorageSync('auth') === authCode.manager &&  <ChargeRecordList/>}
            {Taro.getStorageSync('auth') === authCode.shopOwner &&  <MyOrderList/>}
            {Taro.getStorageSync('auth') === authCode.employe &&  <MySubscribeList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {Taro.getStorageSync('auth') === authCode.manager &&  <ConsumeRecordList/>}
            {Taro.getStorageSync('auth') === authCode.shopOwner &&  <MySubscribeList/>}
            {Taro.getStorageSync('auth') === authCode.employe &&  <ConsumeRecordList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {Taro.getStorageSync('auth') === authCode.shopOwner &&  <ChargeRecordList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            {Taro.getStorageSync('auth') === authCode.shopOwner &&  <ConsumeRecordList/>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
