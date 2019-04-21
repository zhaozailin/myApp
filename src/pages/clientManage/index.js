import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtTabBar} from 'taro-ui'
import {queryClientList} from '../../request/clientManage'
import './index.less'
import {changeBottomTab, initBottomTabList} from "../../utils/uiUtils";

export default class ClientManage extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '客户管理',
    enablePullDownRefresh: true,
  }

  onPullDownRefresh() {
    this.queryList(() => {
      wx.stopPullDownRefresh();
    })
  }

  queryList = (callback) => {
    queryClientList({
      uId: Taro.getStorageSync('uId')
    }).then((list) => {
      this.setState({
        list,
        oriList: list
      }, () => {
        callback && callback()
      })
    })
  }

  componentDidMount() {
    this.queryList()
  }

  search = () => {
    let key = this.state.searchkey;
    if (key.trim()) {
      let newList = [];
      this.state.oriList.forEach((ele) => {
        if (ele.nick_name.indexOf(key) !== -1) {
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

  render() {
    return (
      <View className='m-wrap'>
        <View className='cs-wrap'>
          <AtSearchBar
            value={this.state.searchkey}
            onChange={this.changeSearchInput}
            onActionClick={this.search}
          />
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