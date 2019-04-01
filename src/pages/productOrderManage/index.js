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
    current: 0
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
    const tabList = [{ title: '我的订单' }, { title: '我的预约' }, { title: '充值记录' }, { title: '消费记录' }]
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            <MyOrderList/>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <MySubscribeList/>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <ChargeRecordList/>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <ConsumeRecordList/>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
