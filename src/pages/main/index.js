import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import ProductOrderManage from '../productOrderManage'
import './index.less'
import MyShop from "../myShop";
import ClientShop from "../clientShop";
import ShopProductManage from "../shopProductManage";
import {queryUserInfo} from "../../request/user";

export default class Main extends Component {
  state = {
    current: 0,
    tabList: [],
  }

  componentDidMount = () => {
    queryUserInfo({uId: Taro.getStorageSync('uId')}).then((result) => {
      let auth = result.auth;
      Taro.setStorageSync('auth', auth)
      Taro.setStorageSync('shopId', result.shopId)
      // 管理员
      if (auth === 1) {
        this.setState({
          tabList: [
            { title: '工单管理', iconType: 'bullet-list' },
            { title: '门店管理', iconType: 'shopping-bag-2' },
            { title: '客户管理', iconType: 'user' }
          ]
        })
      }
      // 店长、员工
      else if (auth === 2 || auth === 3) {
        this.setState({
          tabList: [
            { title: '工单管理', iconType: 'bullet-list' },
            { title: '门店管理', iconType: 'shopping-bag-2' },
            { title: '我的门店', iconType: 'user' }
          ]
        })
      }
    })
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View className='m-wrap'>
        {this.state.current === 0 && <ProductOrderManage/>}
        {this.state.current === 1 && <ShopProductManage/>}
        {(Taro.getStorageSync('auth') !== 1 && this.state.current === 2) && <MyShop/>}
        {(Taro.getStorageSync('auth') === 1 && this.state.current === 2) && <ClientShop/>}
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
