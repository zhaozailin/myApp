import Taro, {Component} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
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

  shareWeCode = () => {
    // Taro.request({
    //   data: {
    //     phone: '15068140482',
    //   },
    //   url: 'http://localhost:8000/getwxacode',
    //   success: (r) => {
    //     // let payModel = r.data;
    //   }
    // })
    this.onShareAppMessage();
  }

  onShareAppMessage1 = () => {
    return {
      title: '标题',
      path: '/pages/loginRegister/index?phone=' + '15068140482',
      imageUrl: 'http://src.onlinedown.net/images/xcs/4/fbbf04b527486a623eaa33fc8304bbca396afb34-a0dcd7fbbcba9dad42759929b02fdbd52bd03aeb.png',
      success(r) {
        console.log(r);
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail(r) {
        console.log(r);
      }
    }
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
            <Button type='primary' openType='share'>分享链接 邀请好友</Button>
          </View>
          <AtButton type='secondary' onClick={this.shareWeCode}>生成门店二维码</AtButton>
        </View>
      </View>
    )
  }
}
