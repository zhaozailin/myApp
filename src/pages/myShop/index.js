import Taro, {Component} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import {AtList, AtButton, AtListItem} from 'taro-ui'
import {queryShopInfo, renewSuccess} from '../../request/user'
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
    // this.onShareAppMessage();
  }

  onShareAppMessage () {
    return {
      title: '母婴商店',
      path: '/pages/loginRegister/index?phone=' + Taro.getStorageSync('username'),
      imageUrl: 'https://www.1wang.xyz/img/xizao.jpeg',
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
    // let fee = 1;
    // pay(fee, '门店续费', () => {
    //
    // })
    renewSuccess({
      shopId: Taro.getStorageSync('shopId')
    }).then(() => {
      Taro.showToast({title: '续费成功', icon: 'none'});
      queryShopInfo({
        shopId: Taro.getStorageSync('shopId')
      }).then((detail) => {
        this.setState({
          detail
        })
      })
    });
  }

  render() {
    return (
      <View className='ms-wrap'>
        <AtList>
          <AtListItem title='店长姓名' extraText={this.state.detail.name} />
          <AtListItem title='店长电话' extraText={this.state.detail.phone} />
          <AtListItem title='门店地址' note={this.state.detail.addr} />
        </AtList>
        {this.state.detail.shop_status === 1 &&
        <View className='ms-btn-warn'>
          <View>您的店于{this.state.detail.expiredate}即将过期，每次续费时间为一年，请点击续费。</View>
          <AtButton type='secondary' onClick={this.toPay}>续费</AtButton>
        </View>
        }
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
