import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtTabBar} from 'taro-ui'
import {queryClientList} from '../../request/clientManage'
import './index.less'
import {changeBottomTab, initBottomTabList, scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";

export default class ClientManage extends Component {
  state = Object.assign(pageState, {});

  config = {
    navigationBarTitleText: '客户管理',
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
    queryClientList({
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

  render() {
    return (
      <View className='m-wrap'>
        <View>
          <AtSearchBar
            value={this.state.searchkey}
            onChange={this.changeSearchInput}
            onActionClick={() => {refreshToFirst(this)}}
          />
          <ScrollView
            className='com-scroll-view3'
            scrollY
            onScrollToLower={() => {
              scrollToLower(this)
            }}
          >
            {
              this.state.list.map(ele => {
                return (
                  <View key={ele.id} className='cs-ele'>
                    <AtCard
                      title={ele.nick_name}
                    >
                      <View className='at-row'>
                        <View className='at-col at-col-12'>
                          <View>手机：{ele.telephone}</View>
                          <View>所属门店：{ele.shop_name}</View>
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
          current={2}
        />
      </View>
    )
  }
}
