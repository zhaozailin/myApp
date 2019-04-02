import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import {AtCard, AtSearchBar, AtButton} from 'taro-ui'
import {queryEmployeList} from '../../request/shopProductManage'
import './index.less'

export default class List extends Component {
  state = {
    searchkey: '',
    list: []
  }

  config = {
    navigationBarTitleText: '员工管理'
  }

  componentDidMount() {
    queryEmployeList({
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
              <View key={ele.id} className='mol-ele'>
                <AtCard
                  title={ele.name}
                >
                  <View className='at-row'>
                    <View className='at-col at-col-10'>
                      <View>电话：{ele.phone}</View>
                      <View>身份证号：{ele.identity_cards}</View>
                    </View>
                    <View className='at-col at-col-2'>
                      <AtButton type='primary' size='small'>{ele.active_status ? '禁用' : '启用'}</AtButton>
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
