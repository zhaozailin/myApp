import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtButton, AtSearchBar, AtTabBar, AtTabs} from 'taro-ui'
import {queryOrderList, confirmOrder} from '../../request/productOrderManage'
import './index.less'
import {initBottomTabList, changeBottomTab, initOrderTabList, changeOrderTab} from "../../utils/uiUtils";

export default class MyOrderList extends Component {
  state = {
    searchkey: '',
    oriList: [],
    list: [],
  }

  config = {
    navigationBarTitleText: '工单管理',
    enablePullDownRefresh: true,
  }

  onPullDownRefresh() {
    this.queryList(() => {
      wx.stopPullDownRefresh();
    })
  }

  componentDidMount() {
    this.queryList();
  }

  queryList = (callback) => {
    queryOrderList({
      shopId: Taro.getStorageSync('shopId')
    }).then((list) => {
      this.setState({
        list,
        oriList: list
      }, () => {
        callback && callback();
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

  confirmOrder = (id) => {
    console.log(id);
    confirmOrder({id: id}).then(() => {
      Taro.showToast({title: '确认成功', icon: 'none'})
      this.queryList();
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={0} tabList={initOrderTabList()} onClick={(cur) => {
          changeOrderTab(cur)
        }}/>

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
                        <AtButton type='primary' size='small' onClick={this.confirmOrder.bind(this, ele.id)}>确认</AtButton>
                      </View>
                    </View>
                  </AtCard>
                </View>
              )
            })
          }
        </View>

        <AtTabBar
          fixed
          tabList={initBottomTabList()}
          onClick={(cur) => {
            changeBottomTab(cur)
          }}
          current={0}
        />
      </View>
    )
  }
}
