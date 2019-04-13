import Taro, {Component} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import {AtList, AtButton, AtListItem} from 'taro-ui'
import {queryShopInfo} from '../../request/user'
import {pay} from '../../utils/payUtils'
import './index.less'

export default class MyShop extends Component {
  state = {
    detail: {}
  }

  config = {
    navigationBarTitleText: '我的门店'
  }

  componentDidMount() {
    queryShopInfo({
      shopId: Taro.getStorageSync('shopId')
    }).then((detail) => {
      this.setState({
        detail
      })
    })
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

  toPay = () => {
    pay(99800, '门店续费', () => {
    })
  }

  render() {
    return (
      <View className='ms-wrap'>
        <AtList>
          <AtListItem title='店长姓名' extraText={this.state.detail.name} />
          <AtListItem title='店长电话' extraText={this.state.detail.phone} />
          <AtListItem title='门店地址' note={this.state.detail.addr} />
        </AtList>
        <View className='ms-btn-warn'>您的店于{this.state.detail.expiredate}即将过期，每次续费时间为一年，请点击<a onClick={this.toPay}>续费</a></View>
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
