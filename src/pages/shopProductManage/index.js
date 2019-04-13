import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtTabs, AtTabsPane} from 'taro-ui'
import './index.less'
import ShopListManage from "../shopListManage";
import EmployeListManage from "../employeListManage";
import ProductListManage from "../productListManage";
import ShopCheckList from "../shopCheckList";
import authCode from "../../config/authCode";

export default class ShopProductManage extends Component {
  state = {
    current: 0,
    tabList: [],
  }

  componentDidMount() {
    console.log('componentDidMount222')
    // 管理员
    if (Taro.getStorageSync('auth') === authCode.manager) {
      this.setState({
        tabList: [
          {title: '门店列表'},
          {title: '门店审核'},
          {title: '员工管理'},
          {title: '商品管理'}
        ]
      })
    }
    // 店长
    else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
      this.setState({
        tabList: [
          {title: '员工管理'},
          {title: '商品管理'}
        ]
      })
    }
    // 员工
    else if (Taro.getStorageSync('auth') === authCode.employe) {
      this.setState({
        tabList: [
          {title: '员工管理'},
        ]
      })
    }
  }

  config = {
    navigationBarTitleText: '门店管理'
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render() {
    console.log('8888888888888')
    console.log(Taro.getStorageSync('auth'))
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={this.state.tabList}
                onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0}>
            {Taro.getStorageSync('auth') === authCode.manager && <ShopListManage/>}
            {Taro.getStorageSync('auth') === authCode.shopOwner && <EmployeListManage/>}
            {Taro.getStorageSync('auth') === authCode.employe && <EmployeListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {Taro.getStorageSync('auth') === authCode.manager && <ShopCheckList/>}
            {Taro.getStorageSync('auth') === authCode.shopOwner && <ProductListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {Taro.getStorageSync('auth') === authCode.manager && <EmployeListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            {Taro.getStorageSync('auth') === authCode.manager && <ProductListManage/>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
