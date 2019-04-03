import Taro, {Component} from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import 'taro-ui/dist/style/components/flex.scss'
import {AtCard, AtSearchBar, AtButton} from 'taro-ui'
import {queryProducList} from '../../request/shopProductManage'
import './index.less'

export default class List extends Component {
  state = {
    searchkey: '',
    list: []
  }

  config = {
    navigationBarTitleText: '产品管理'
  }

  componentDidMount() {
    queryProducList({
      uId: Taro.getStorageSync('uId')
    }).then((list) => {
      this.setState({
        list
      })
    })
  }

  search = () => {
    let key = this.state.searchkey;
    console.log(key);
  }

  changeSearchInput = (searchkey) => {
    this.setState({
      searchkey
    })
  }

  upOrDown = (status, e) => {
    e.stopPropagation()
  }

  toEdit = (ele) => {
    this.props.showEdit(ele);
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
                    <View className='at-col at-col-7'>
                      <Image
                        className='plm-img'
                        src=''
                        mode='widthFix' />
                    </View>
                    <View className='at-col at-col-3'>
                      <View>单价：{ele.price}</View>
                      <View>数量：{ele.count}</View>
                    </View>
                    <View className='at-col at-col-2'>
                      <AtButton type='primary' size='small' onClick={this.upOrDown.bind(this, ele.active_status)}>{ele.active_status ? '下架' : '上架'}</AtButton>
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
