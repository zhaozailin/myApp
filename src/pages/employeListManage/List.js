import Taro, {Component} from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton} from 'taro-ui'
import {queryEmployeList, changeEmployeState} from '../../request/shopProductManage'
import {scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";
import './index.less'
import '../../app.less'
import authCode from '../../config/authCode'

export default class List extends Component {
  state = Object.assign(pageState, {});

  config = {
    navigationBarTitleText: '员工管理'
  }

  componentDidMount() {
    refreshToFirst(this);
  }

  queryList = (callback) => {
    queryEmployeList({
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

  changeStatus = (ele, e) => {
    e.stopPropagation();
    changeEmployeState({
      id: ele.id,
      active_status: ele.active_status ? 0 : 1,
      name: ele.name,
      identity_cards: ele.identity_cards,
      shop_id: Taro.getStorageSync('shopId')
    }).then(() => {
      Taro.showToast({title: '操作成功', icon: 'none'});
      refreshToFirst(this)
    })
  }

  toEdit = (ele) => {
    // 只有店长才能编辑
    if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      this.props.onShowCreate(ele)
    }
  }

  render() {
    return (
      <View>
        {
          Taro.getStorageSync('auth') === authCode.shopOwner &&
          <View className='slm-btn-wrap'>
            <AtButton type='primary' onClick={() => {
              this.props.onShowCreate();
            }}>添加</AtButton>
          </View>
        }
        <AtSearchBar
          value={this.state.searchkey}
          onChange={this.changeSearchInput}
          onActionClick={() => {refreshToFirst(this)}}
        />
        <ScrollView
          className={Taro.getStorageSync('auth') === authCode.shopOwner ? 'com-scroll-view2' : 'com-scroll-view'}
          scrollY
          onScrollToLower={() => {
            scrollToLower(this)
          }}
        >
          {
            this.state.list.map(ele => {
              return (
                <View key={ele.id} className='mol-ele' onClick={this.toEdit.bind(this, ele)}>
                  <AtCard
                    title={ele.name}
                  >
                    <View className='at-row'>
                      <View className='at-col at-col-9'>
                        <View>电话：{ele.phone}</View>
                        <View>身份证号：{ele.identity_cards}</View>
                      </View>
                      {
                        Taro.getStorageSync('auth') !== authCode.employe &&
                        <View className='at-col at-col-3'>
                          <Button type='primary' size='mini' onClick={this.changeStatus.bind(this, ele)}>{ele.active_status ? '启用' : '禁用'}</Button>
                        </View>
                      }
                    </View>
                  </AtCard>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}
