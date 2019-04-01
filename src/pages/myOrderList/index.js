import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import {AtCard, AtButton} from 'taro-ui'
import './index.less'

export default class MyOrderList extends Component {
  state = {
    list: []
  }

  config = {
    navigationBarTitleText: '工单管理'
  }

  componentDidMount() {
    this.setState({
      list: [
        {
          id: 1,
          productId: 1,
          productName: '洗澡1',
          name: '泥宝宝',
          phone: '15068139393',
          amount: '168',
        },
        {
          id: 2,
          productId: 2,
          productName: '洗澡2',
          name: '泥宝宝',
          phone: '15068139393',
          amount: '168',
        },
        {
          id: 3,
          productId: 3,
          productName: '洗澡3',
          name: '泥宝宝',
          phone: '15068139393',
          amount: '168',
        },
        {
          id: 4,
          productId: 4,
          productName: '洗澡4',
          name: '泥宝宝',
          phone: '15068139393',
          amount: '168',
        },
        {
          id: 5,
          productId: 5,
          productName: '洗澡5',
          name: '泥宝宝',
          phone: '15068139393',
          amount: '168',
        }
      ]
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='mol-wrap'>
        {
          this.state.list.map(ele => {
            return (
              <View key={ele.id} className='mol-ele'>
                <AtCard
                  title={ele.productName}
                >
                  <View className='at-row'>
                    <View className='at-col at-col-10'>
                      <View>微信昵称：{ele.name}</View>
                      <View>手机：{ele.phone}</View>
                      <View>应缴费用：{ele.amount}</View>
                    </View>
                    <View className='at-col at-col-2'>
                      <AtButton type='primary' size='small'>确认</AtButton>
                    </View>
                  </View>
                </AtCard>
              </View>
            )
          })
        }
      </View>
    )
  }
}
