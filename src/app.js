import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import './app.less'
import './custom-theme.scss'
import './style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/loginRegister/index',
      'pages/toMother/index',
      'pages/myOrderList/index',
      'pages/mySubscribeList/index',
      'pages/chargeRecordList/index',
      'pages/consumeRecordList/index',
      'pages/shopListManage/index',
      'pages/shopCheckList/index',
      'pages/employeListManage/index',
      'pages/productListManage/index',
      'pages/clientManage/index',
      'pages/myShop/index',
    ],

    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    }
  }

  componentDidMount () {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
