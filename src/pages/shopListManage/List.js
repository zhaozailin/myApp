import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton} from 'taro-ui'
import {queryShopList, changeState} from '../../request/shopProductManage'
import './index.less'

export default class List extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '门店管理'
  }

  componentDidMount() {
    this.queryList();
  }

  queryList = () => {
    this.setState({
      list: [],
      oriList: [],
    }, () => {
      queryShopList({
        uId: Taro.getStorageSync('uId')
      }).then((list) => {
        this.setState({
          list,
          oriList: list
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

  toEdit = (ele) => {
    this.props.showCreate(ele)
  }

  changeState = (ele, e) => {
    e.stopPropagation();
    changeState({
      shopId: ele.id,
      active: ele.active ? 0 : 1
    }).then(() => {
      Taro.showToast({title: '操作成功', icon: 'none'})
      this.queryList();
    })
  }

  render() {
    return (
      <View>
        <View className='slm-btn-wrap'>
          <AtButton type='primary' onClick={() => {
            this.props.showCreate();
          }}>添加</AtButton>
        </View>
        <AtSearchBar
          value={this.state.searchkey}
          onChange={this.changeSearchInput}
          onActionClick={this.search}
        />
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
                      <Button type='primary' size='mini' onClick={this.changeState.bind(this, ele)}>{ele.active ? '禁用' : '启用'}</Button>
                    </View>
                  </View>
                </AtCard>
              </View>
            )
          })
        }
      </View>
    )
  }
}
