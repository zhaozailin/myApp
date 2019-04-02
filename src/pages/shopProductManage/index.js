import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.less'
import ShopListManage from "../shopListManage";

export default class ShopProductManage extends Component {
  state = {
    current: 0
  }

  config = {
    navigationBarTitleText: '门店管理'
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  render() {
    const tabList = [{ title: '门店管理' }, { title: '员工管理' }, { title: '商品管理' }]
    return (
      <View className='pom-wrap'>
        <AtTabs fixed swipeable={false} current={this.state.current} tabList={tabList} onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0} >
            <ShopListManage/>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
