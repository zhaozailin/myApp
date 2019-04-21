import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
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
        <AtTabs swipeable={false} current={this.state.current} tabList={this.state.tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            {(this.state.current === 0 && Taro.getStorageSync('auth') === authCode.manager) &&  <ChargeRecordList/>}
            {/*{(this.state.current === 0 && Taro.getStorageSync('auth') === authCode.shopOwner) &&  <MyOrderList/>}*/}
            {(this.state.current === 0 && Taro.getStorageSync('auth') === authCode.employe) &&  <MySubscribeList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {(this.state.current === 1 && Taro.getStorageSync('auth') === authCode.manager) &&  <ConsumeRecordList/>}
            {(this.state.current === 1 && Taro.getStorageSync('auth') === authCode.shopOwner) &&  <MySubscribeList/>}
            {(this.state.current === 1 && Taro.getStorageSync('auth') === authCode.employe) &&  <ConsumeRecordList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {(this.state.current === 2 && Taro.getStorageSync('auth') === authCode.shopOwner) &&  <ChargeRecordList/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            {(this.state.current === 3 && Taro.getStorageSync('auth') === authCode.shopOwner) &&  <ConsumeRecordList/>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
