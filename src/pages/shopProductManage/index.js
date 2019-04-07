import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import ShopListManage from "../shopListManage";
import EmployeListManage from "../employeListManage";
import ProductListManage from "../productListManage";
import ShopCheckList from "../shopCheckList";

export default class ShopProductManage extends Component {
  componentDidMount = () => {
    // 管理员
    if (Taro.getStorageSync('auth') === 1) {
      this.setState({
        tabList: [
          { title: '门店列表' },
          { title: '门店审核' },
          { title: '员工管理' },
          { title: '商品管理' }
        ]
      })
    }
    // 店长
    else if (Taro.getStorageSync('auth') === 2) {
      this.setState({
        tabList: [
          { title: '员工管理' },
          { title: '商品管理' }
        ]
      })
    }
    // 员工
    else if (Taro.getStorageSync('auth') === 3) {
      this.setState({
        tabList: [
          { title: '员工管理' },
        ]
      })
    }
  }

  state = {
    current: 0,
    tabList: [],
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
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={this.state.tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            {Taro.getStorageSync('auth') === 1 &&  <ShopListManage/>}
            {Taro.getStorageSync('auth') === 2 &&  <EmployeListManage/>}
            {Taro.getStorageSync('auth') === 3 &&  <EmployeListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {Taro.getStorageSync('auth') === 1 &&  <ShopCheckList/>}
            {Taro.getStorageSync('auth') === 2 &&  <ProductListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {Taro.getStorageSync('auth') === 1 &&  <EmployeListManage/>}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            {Taro.getStorageSync('auth') === 1 &&  <ProductListManage/>}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
