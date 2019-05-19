import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {AtCard, AtSearchBar, AtTabBar, AtTabs} from 'taro-ui'
import {queryConsumeRecordList} from '../../request/productOrderManage'
import './index.less'
import authCode from "../../config/authCode";
import {initBottomTabList, changeBottomTab, initOrderTabList, changeOrderTab, initOrderTabCurForConsume, scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";

export default class ConsumeRecordList extends Component {
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
    queryConsumeRecordList({
      pageNo: this.state.pageNo,
      key: this.state.searchkey,
      shopId: (Taro.getStorageSync('auth') === authCode.shopOwner) ? Taro.getStorageSync('shopId') : 0
    }).then((list) => {
      callback && callback(list);
    })
  }

  changeSearchInput = (searchkey) => {
    this.setState({
      searchkey: searchkey.trim()
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={initOrderTabCurForConsume()} tabList={initOrderTabList()} onClick={(cur) => {
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
                      <View>微信昵称：{ele.name}</View>
                      <View>手机：{ele.phone}</View>
                      <View>消费次数：{ele.subscribeCount}</View>
                      <View>操作员：{ele.operatorName}</View>
                      <View>消费时间：{ele.customerTime}</View>
                      <View>消费门店：{ele.shopName}</View>
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
