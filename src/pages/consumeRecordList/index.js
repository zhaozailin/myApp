import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtCard, AtSearchBar} from 'taro-ui'
import {queryConsumeRecordList} from '../../request/productOrderManage'
import './index.less'

export default class ConsumeRecordList extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  componentDidMount() {
    queryConsumeRecordList({
      shopId: Taro.getStorageSync('shopId')
    }).then((list) => {
      this.setState({
        list,
        oriList: list
      })
    })
  }

  search = () => {
    let key = this.state.searchkey;
    if (key.trim()) {
      let newList = [];
      this.state.oriList.forEach((ele) => {
        if (ele.name.indexOf(key) !== -1 || ele.phone === key) {
          newList.push(ele);
        }
      })
      this.setState({
        list: [...newList]
      })
    }
    else {
      this.setState({
        list: [...this.state.oriList]
      })
    }
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
