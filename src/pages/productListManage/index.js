import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabBar, AtTabs} from 'taro-ui'
import List from './List'
import Edit from './Edit'
import './index.less'
import {
  initBottomTabList,
  changeBottomTab,
  changeShopTab,
  initShopTabList
} from "../../utils/uiUtils";


export default class ProductListManage extends Component {
  state = {
    showList: true,
    product: {}
  }

  config = {
    navigationBarTitleText: '门店管理',
    enablePullDownRefresh: true,
  }

  onPullDownRefresh() {
    if (!this.state.showList) {
      wx.stopPullDownRefresh();
    }
    else {
      this.listRef.queryList(() => {
        wx.stopPullDownRefresh();
      })
    }
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={1} tabList={initShopTabList()} onClick={(cur) => {
          changeShopTab(cur)
        }}/>

        <View className='mol-wrap'>
          {this.state.showList && <List ref={(obj) => {this.listRef = obj}} onShowEdit={(product) => {
            this.setState({
              product,
              showList: false
            })
          }}/>}
          {!this.state.showList && <Edit product={this.state.product} onBack={() => {
            this.setState({showList: true})
          }}/>}
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
