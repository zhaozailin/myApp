import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton, AtTabBar, AtTabs} from 'taro-ui'
import {queryShopCheckList, confirmCheck} from '../../request/shopProductManage'
import './index.less'
import {
  initBottomTabList,
  changeBottomTab,
  changeShopTab,
  initShopTabList,
  scrollToLower, refreshToFirst, pageState
} from "../../utils/uiUtils";

export default class ShopCheckList extends Component {
  state = Object.assign(pageState, {});

  config = {
    navigationBarTitleText: '门店管理',
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
    queryShopCheckList({
      pageNo: this.state.pageNo,
      key: this.state.searchkey,
      uId: Taro.getStorageSync('uId')
    }).then((list) => {
      callback && callback(list);
    })
  }

  changeSearchInput = (searchkey) => {
    this.setState({
      searchkey: searchkey.trim()
    })
  }

  confirm = (id) => {
    confirmCheck({shopId: id}).then(() => {
      Taro.showToast({title: '审核通过', icon: 'none'})
      refreshToFirst(this)
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={1} tabList={initShopTabList()} onClick={(cur) => {
          changeShopTab(cur)
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
                      title={ele.name}
                    >
                      <View className='at-row'>
                        <View className='at-col at-col-10'>
                          <View>电话：{ele.phone}</View>
                          <View>门店地址：{ele.addr}</View>
                          <View>过期日期：{ele.expiredate}</View>
                          <View>门店编号：{ele.id}</View>
                        </View>
                        <View className='at-col at-col-2'>
                          <AtButton type='primary' size='small' onClick={this.confirm.bind(this, ele.id)}>通过</AtButton>
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
          current={1}
        />
      </View>
    )
  }
}
