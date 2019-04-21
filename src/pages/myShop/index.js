import Taro, {Component} from '@tarojs/taro'
import {View, Button} from '@tarojs/components'
import {AtList, AtButton, AtListItem, AtTabBar} from 'taro-ui'
import {queryShopInfo, renewSuccess} from '../../request/user'
import {pay} from '../../utils/payUtils'
import './index.less'
import {changeBottomTab, initBottomTabList} from "../../utils/uiUtils";

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

  onShareAppMessage(e) {
    if (e.target.id === 'plat') {
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
    else if (e.target.id === 'shop') {
      return {
        title: '母婴商店',
        path: '/pages/toMother/index?shopId=' + Taro.getStorageSync('shopId'),
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
  }

  toPay = () => {
    let fee = 1;
    pay(fee, '门店续费', () => {
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
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        <View className='ms-wrap'>
          <AtList>
            <AtListItem title='店长姓名' extraText={this.state.detail.name}/>
            <AtListItem title='店长电话' extraText={this.state.detail.phone}/>
            <AtListItem title='门店地址' note={this.state.detail.addr}/>
          </AtList>
          {this.state.detail.shop_status === 1 &&
          <View className='ms-btn-warn'>
            <View>您的店于{this.state.detail.expiredate}即将过期，每次续费时间为一年，请点击续费。</View>
            <AtButton type='secondary' onClick={this.toPay}>续费</AtButton>
          </View>
          }
          <View className='ms-btn-wrap'>
            <View className='ms-btn-share'>
              <Button type='primary' id={'plat'} openType='share'>分享门店平台给别人</Button>
            </View>
            <Button id={'shop'} openType='share'>分享我的门店给用户</Button>
          </View>
        </View>

        <AtTabBar
          fixed
          tabList={initBottomTabList()}
          onClick={(cur) => {
            changeBottomTab(cur)
          }}
          current={2}
        />
      </View>
    )
  }
}
