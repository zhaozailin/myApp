import Taro, {Component} from '@tarojs/taro'
import {getOpenId} from "../../utils/payUtils";

export default class ToMother extends Component {
  state = {
    openId: '',
    shopId: ''
  }

  config = {
    navigationBarTitleText: ''
  }

  componentDidMount() {
    wx.login({
      success: (r) => {
        console.log(r);
      }
    })
    this.setState({
      shopId: this.$router.params.shopId
    })

    // 获取openId
    getOpenId(openId => {
      this.setState({
        openId
      })
    })
  }

  render() {
    return (
      <View>
        <web-view src={'http://localhost:3000?openId=' + this.state.openId + '&shopId=' + this.state.shopId +'#/main'}/>
      </View>
    )
  }
}
