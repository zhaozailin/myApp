import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtCard, AtSearchBar} from 'taro-ui'
import {queryConsumeRecordList} from '../../request/productOrderManage'
import './index.less'

export default class ConsumeRecordList extends Component {
  state = {
    searchkey: '',
    list: []
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  componentDidMount() {
    queryConsumeRecordList({
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
                  <View>微信昵称：{ele.name}</View>
                  <View>手机：{ele.phone}</View>
                  <View>消费金额：{ele.amount}</View>
                  <View>操作员：{ele.operatorName}</View>
                  <View>消费时间：{ele.customeTime}</View>
                </AtCard>
              </View>
            )
          })
        }
      </View>
    )
  }
}
