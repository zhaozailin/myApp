import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import List from './List'
import Create from './Create'
import './index.less'

export default class ShopListManage extends Component {
  state = {
    showList: true
  }

  config = {
    navigationBarTitleText: '门店管理'
  }

  componentDidMount() {
  }

  render() {
    return (
      <View className='mol-wrap'>
        {this.state.showList && <List showCreate={() => {
          this.setState({showList: false})
        }}/>}
        {!this.state.showList && <Create/>}
      </View>
    )
  }
}
