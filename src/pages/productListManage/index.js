import {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import List from './List'
import Edit from './Edit'
import './index.less'

export default class ProductListManage extends Component {
  state = {
    showList: true,
    product: {}
  }

  config = {
    navigationBarTitleText: '产品管理'
  }

  render() {
    return (
      <View className='mol-wrap'>
        {this.state.showList && <List showEdit={(product) => {
          this.setState({
            product,
            showList: false
          })
        }}/>}
        {!this.state.showList && <Edit product={this.state.product} back={() => {
          this.setState({showList: true})
        }}/>}
      </View>
    )
  }
}
