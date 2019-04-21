import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton, AtTabBar, AtTabs} from 'taro-ui'
import {queryShopCheckList, confirmCheck} from '../../request/shopProductManage'
import './index.less'
import {
  initBottomTabList,
  changeBottomTab,
  changeShopTab,
  initShopTabList
} from "../../utils/uiUtils";

export default class ShopCheckList extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '门店管理',
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
    this.setState({
      list: [],
      oriList: []
    }, () => {
      queryShopCheckList({
        uId: Taro.getStorageSync('uId')
      }).then((list) => {
        this.setState({
          list,
          oriList: list
        }, () => {
          callback && callback()
        })
      })
    })
  }

  search = () => {
    let key = this.state.searchkey;
    if (key.trim()) {
      let newList = [];
      this.state.oriList.forEach((ele) => {
        if (ele.name.indexOf(key) !== -1) {
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

  confirm = (id) => {
    confirmCheck({shopId: id}).then(() => {
      Taro.showToast({title: '审核通过', icon: 'none'})
      this.queryList();
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={1} tabList={initShopTabList()} onClick={(cur) => {
          changeShopTab(cur)
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
