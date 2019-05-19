import Taro, {Component} from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtButton, AtSearchBar, AtTabBar, AtTabs} from 'taro-ui'
import {queryOrderList, confirmOrder} from '../../request/productOrderManage'
import './index.less'
import {initBottomTabList, changeBottomTab, initOrderTabList, changeOrderTab, scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";

export default class MyOrderList extends Component {
  state = Object.assign(pageState, {});

  config = {
    navigationBarTitleText: '工单管理',
    enablePullDownRefresh: true,
  }

  onPullDownRefresh() {
    refreshToFirst(this, () => {
      wx.stopPullDownRefresh();
    })
  }

  componentDidMount() {
    refreshToFirst(this);
  }

  queryList = (callback) => {
    queryOrderList({
      pageNo: this.state.pageNo,
      key: this.state.searchkey,
      shopId: Taro.getStorageSync('shopId')
    }).then((list) => {
      callback && callback(list);
    })
  }

  changeSearchInput = (searchkey) => {
    this.setState({
      searchkey: searchkey.trim()
    })
  }

  confirmOrder = (id) => {
    console.log(id);
    confirmOrder({id: id}).then(() => {
      Taro.showToast({title: '确认成功', icon: 'none'})
      refreshToFirst(this)
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={0} tabList={initOrderTabList()} onClick={(cur) => {
          changeOrderTab(cur)
        }}/>

        <View>
          <AtSearchBar
            value={this.state.searchkey}
            onChange={this.changeSearchInput}
            onActionClick={() => {refreshToFirst(this)}}
          />
          <ScrollView
            className='com-scroll-view'
            scrollY
            onScrollToLower={() => {
              scrollToLower(this)
            }}
          >
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
          </ScrollView>
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
