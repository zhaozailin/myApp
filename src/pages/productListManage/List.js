import Taro, {Component} from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar} from 'taro-ui'
import {queryProducList, changeProductState} from '../../request/shopProductManage'
import './index.less'
import authCode from "../../config/authCode";

export default class List extends Component {
  state = {
    searchkey: '',
    list: [],
    oriList: [],
  }

  config = {
    navigationBarTitleText: '产品管理'
  }

  componentDidMount() {
    this.queryList()
  }

  queryList = () => {
    queryProducList({
      uId: Taro.getStorageSync('uId')
    }).then((list) => {
      this.setState({
        list,
        oriList: list
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

  upOrDown = (ele, e) => {
    e.stopPropagation()
    changeProductState({
      id: ele.id,
      active_status: ele.active_status
    }).then(() => {
      Taro.showToast({title: '操作成功', icon: 'none'});
      this.queryList()
    })
  }

  toEdit = (ele) => {
    if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      this.props.showEdit(ele);
    }
  }

  render() {
    return (
      <View>
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
                    <View className='at-col at-col-6'>
                      <Image
                        className='plm-img'
                        src=''
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
      </View>
    )
  }
}
