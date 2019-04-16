import Taro, {Component} from '@tarojs/taro'

export default class ToMother extends Component {
  state = {
    shopId: ''
  }

  config = {
    navigationBarTitleText: ''
  }

  componentDidMount() {
    this.setState({
      shopId: this.$router.params.shopId
    })
  }

  render() {
    return (
      <View>
        <web-view src={'https://www.1wang.xyz?shopId=' + this.state.shopId}/>
      </View>
    )
  }
}
