import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabBar, AtTabs} from 'taro-ui'
import List from './List'
import Create from './Create'
import './index.less'
import {
  initBottomTabList,
  changeBottomTab,
  changeShopTab,
  initShopTabList,
  refreshToFirst
} from "../../utils/uiUtils";

export default class EmployeListManage extends Component {
  state = {
    showList: true,
    employe: {},
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
      refreshToFirst(this.listRef, () => {
        wx.stopPullDownRefresh();
      })
    }
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={0} tabList={initShopTabList()} onClick={(cur) => {
          changeShopTab(cur)
        }}/>

        <View>
          {this.state.showList && <List ref={(obj) => {this.listRef = obj}} onShowCreate={(employe) => {
            this.setState({showList: false})
            this.setState({
              employe: employe || {}
            })
          }}/>}
          {(!this.state.showList) && <Create employe={this.state.employe} onBack={() => {
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
