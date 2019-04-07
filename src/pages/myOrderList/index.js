import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtButton, AtSearchBar} from 'taro-ui'
import {queryOrderList} from '../../request/productOrderManage'
import './index.less'

export default class MyOrderList extends Component {
  state = {
    searchkey: '',
    oriList: [],
    list: [],
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  componentDidMount() {
    queryOrderList({
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
                  <View className='at-row'>
                    <View className='at-col at-col-10'>
                      <View>微信昵称：{ele.name}</View>
                      <View>手机：{ele.phone}</View>
                      <View>应缴费用：{ele.amount}</View>
                    </View>
                    <View className='at-col at-col-2'>
                      <AtButton type='primary' size='small'>确认</AtButton>
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
