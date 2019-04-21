import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtButton, AtSearchBar, AtTabBar, AtTabs} from 'taro-ui'
import {confirmSubscribe, querySubscribeList} from '../../request/productOrderManage'
import './index.less'
import {initBottomTabList, changeBottomTab, initOrderTabList, changeOrderTab, initOrderTabCurForSubscribe} from "../../utils/uiUtils";

export default class MySubscribeList extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '我的预约',
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
    querySubscribeList({
      shopId: Taro.getStorageSync('shopId')
    }).then((list) => {
      this.setState({
        list,
        oriList: list
      }, () => {
        callback && callback()
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

  confirm = (id) => {
    confirmSubscribe({
      id: id,
      uId: Taro.getStorageSync('uId')
    }).then(() => {
      Taro.showToast({title: '确认成功', icon: 'none'})
      this.queryList();
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <AtTabs swipeable={false} current={initOrderTabCurForSubscribe()} tabList={initOrderTabList()} onClick={(cur) => {
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
                        <View>预约时间：{ele.subscribeTime}</View>
                      </View>
                      <View className='at-col at-col-2'>
                        <AtButton type='primary' size='small' onClick={this.confirm.bind(this, ele.id)}>确认</AtButton>
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
