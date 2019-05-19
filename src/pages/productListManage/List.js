import Taro, {Component} from '@tarojs/taro'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar} from 'taro-ui'
import {queryProducList, changeProductState} from '../../request/shopProductManage'
import {scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";
import './index.less'
import '../../app.less'
import authCode from "../../config/authCode";

export default class List extends Component {
  state = Object.assign(pageState, {});

  config = {
    navigationBarTitleText: '产品管理'
  }

  componentDidMount() {
    refreshToFirst(this);
  }

  queryList = (callback) => {
    queryProducList({
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

  upOrDown = (ele, e) => {
    e.stopPropagation()
    changeProductState({
      id: ele.id,
      price: ele.price,
      count: ele.count,
      active_status: ele.active_status ? 0 : 1
    }).then(() => {
      Taro.showToast({title: '操作成功', icon: 'none'});
      refreshToFirst(this)
    })
  }

  toEdit = (ele) => {
    if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      this.props.onShowEdit(ele);
    }
  }

  render() {
    return (
      <View>
        <AtSearchBar
          value={this.state.searchkey}
          onChange={this.changeSearchInput}
          onActionClick={() => {refreshToFirst(this)}}
        />
        <ScrollView
          className={'com-scroll-view'}
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
                      <View className='at-col at-col-6'>
                        <Image
                          className='plm-img'
                          src={ele.url}
                          mode='widthFix' />
                      </View>
                      <View className='at-col at-col-3'>
                        <View>单价：{ele.price}</View>
                        <View>数量：{ele.count}</View>
                      </View>
                      {
                        Taro.getStorageSync('auth') === authCode.shopOwner &&
                        <View className='at-col at-col-3'>
                          <Button type='primary' size='mini' onClick={this.upOrDown.bind(this, ele)}>{ele.active_status ? '下架' : '上架'}</Button>
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
