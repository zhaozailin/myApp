import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import ProductOrderManage from '../productOrderManage'
import './index.less'
import MyShop from "../myShop";
import ClientShop from "../clientShop";
import ShopProductManage from "../shopProductManage";
import authCode from "../../config/authCode";

export default class Main extends Component {
  state = {
    current: 0,
    tabList: [],
  }

  onShareAppMessage (e) {
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

  componentDidMount = () => {
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    }, () => {
      let title = '';
      if (value === 0) {
        title = '工单管理';
      }
      else if (value === 1) {
        title = '门店管理';
      }
      else if (Taro.getStorageSync('auth') !== authCode.manager && value === 2) {
        title = '我的门店';
      }
      else if (Taro.getStorageSync('auth') === authCode.manager && value === 2) {
        title = '客户管理';
      }
      Taro.setNavigationBarTitle({
        title
      })
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        {this.state.current === 0 && <ProductOrderManage/>}
        {this.state.current === 1 && <ShopProductManage/>}
        {(Taro.getStorageSync('auth') !== authCode.manager && this.state.current === 2) && <MyShop/>}
        {(Taro.getStorageSync('auth') === authCode.manager && this.state.current === 2) && <ClientShop/>}
        <AtTabBar
          fixed
          tabList={this.state.tabList}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
