import {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import List from './List'
import Create from './Create'
import './index.less'

export default class EmployeListManage extends Component {
  state = {
    showList: true,
    employe: {},
  }

  config = {
    navigationBarTitleText: '员工管理'
  }

  componentDidMount() {
  }

  render() {
    return (
      <View className='mol-wrap'>
        {this.state.showList && <List showCreate={(employe) => {
          this.setState({showList: false})
          this.setState({
            employe: employe || {}
          })
        }}/>}
        {(!this.state.showList) && <Create employe={this.state.employe} back={() => {
          this.setState({showList: true})
        }}/>}
      </View>
    )
  }
}
