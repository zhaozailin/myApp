import Taro, {Component} from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton} from 'taro-ui'
import {queryShopList, changeState} from '../../request/shopProductManage'
import {scrollToLower, refreshToFirst, pageState} from "../../utils/uiUtils";
import './index.less'
import '../../app.less'

export default class List extends Component {
  state = Object.assign(pageState, {});

  componentDidMount() {
    refreshToFirst(this);
  }

  queryList = (callback) => {
    queryShopList({
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

  toEdit = (ele) => {
    this.props.onShowCreate(ele)
  }

  changeState = (ele, e) => {
    e.stopPropagation();
    changeState({
      shopId: ele.id,
      active: ele.active ? 0 : 1
    }).then(() => {
      Taro.showToast({title: '操作成功', icon: 'none'})
      refreshToFirst(this)
    })
  }

  render() {
    return (
      <View>
        <View className='slm-btn-wrap'>
          <AtButton type='primary' onClick={() => {
            this.props.onShowCreate();
          }}>添加</AtButton>
        </View>
        <AtSearchBar
          value={this.state.searchkey}
          onChange={this.changeSearchInput}
          onActionClick={() => {refreshToFirst(this)}}
        />
        <ScrollView
          className={'com-scroll-view2'}
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
                        <View>门店地址：{ele.addr}</View>
                        <View>过期日期：{ele.expiredate}</View>
                        <View>门店编号：{ele.id}</View>
                      </View>
                      <View className='at-col at-col-3'>
                        <Button type='primary' size='mini' onClick={this.changeState.bind(this, ele)}>{ele.active ? '启用' : '禁用'}</Button>
                      </View>
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
