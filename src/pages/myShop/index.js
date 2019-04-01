import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import {AtList, AtButton, AtListItem} from 'taro-ui'
import './index.less'

export default class MyShop extends Component {
  state = {
  }

  config = {
    navigationBarTitleText: '我的门店'
  }

  componentDidMount() {
  }

  render() {
    return (
      <View className='ms-wrap'>
        <AtList>
          <AtListItem title='店长姓名' extraText='孙阳' />
          <AtListItem title='店长电话' extraText='1506981838' />
          <AtListItem title='门店地址' note='浙江省杭州市萧山区闻堰镇湘湖人家1号店爱婴岛' />
        </AtList>
        <View className='ms-btn-wrap'>
          <View className='ms-btn-share'>
            <AtButton className='ms-btn-share' type='primary'>分享链接 邀请好友</AtButton>
          </View>
          <AtButton type='secondary'>生成门店二维码</AtButton>
        </View>
      </View>
    )
  }
}
