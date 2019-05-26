import Taro, {Component} from '@tarojs/taro'
import {View, Button, Image} from '@tarojs/components'
import {AtList, AtButton, AtListItem, AtTabBar, AtCurtain} from 'taro-ui'
import {queryShopInfo, renewSuccess} from '../../request/user'
import {pay} from '../../utils/payUtils'
import './index.less'
import {changeBottomTab, initBottomTabList} from "../../utils/uiUtils";

export default class MyShop extends Component {
  state = {
    detail: {},
    showCode: false,
    codeUrl: ''
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
    let fee = 99800;
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

  getWxacode = () => {
    Taro.request({
      url: 'https://1wang.xyz/wxacode?shopId=' + Taro.getStorageSync('shopId'),
      success: (res) => {
        this.setState({
          codeUrl: res.data.url,
          showCode: true
        })
      }
    })
  }

  closeCode = () => {
    this.setState({
      showCode: false
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
              <Button type='primary' id={'plat'} openType='share'>推荐门店</Button>
            </View>
            <Button id={'shop'} openType='share'>推广我的门店</Button>
            <View className='ms-btn-share'>
              <Button onClick={this.getWxacode}>获取小程序码</Button>
            </View>
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

        <AtCurtain
          isOpened={this.state.showCode}
          onClose={this.closeCode.bind(this)}
        >
          <Image
            mode={'widthFix'}
            style='width:100%'
            src={this.state.codeUrl}
          />
        </AtCurtain>
      </View>
    )
  }
}
