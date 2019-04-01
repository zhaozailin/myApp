import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import {AtCard, AtSearchBar} from 'taro-ui'
import {queryChargeRecordList} from '../../request/productOrderManage'
import './index.less'

export default class ChargeRecordList extends Component {
  state = {
    searchkey: '',
    list: []
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  componentDidMount() {
    queryChargeRecordList({
      shopId: Taro.getStorageSync('shopId')
    }).then((list) => {
      this.setState({
        list
      })
    })
  }

  search = () => {
    let key = this.state.searchkey;
    console.log(key);
  }

  changeSearchInput = (searchkey) => {
    this.setState({
      searchkey
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='mol-wrap'>
        <AtSearchBar
          value={this.state.searchkey}
          onChange={this.changeSearchInput}
          onActionClick={this.search}
        />
        {
          this.state.list.map(ele => {
            return (
              <View key={ele.id} className='mol-ele'>
                <AtCard
                  title={ele.productName}
                >
                  <View className='at-row'>
                    <View className='at-col at-col-10'>
                      <View>微信昵称：{ele.name}</View>
                      <View>手机：{ele.phone}</View>
                      <View>充值金额：{ele.amount}</View>
                      <View>充值时间：{ele.rechargeTime}</View>
                    </View>
                  </View>
                </AtCard>
              </View>
            )
          })
        }
      </View>
    )
  }
}
