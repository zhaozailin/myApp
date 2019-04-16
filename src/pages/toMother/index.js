import Taro, {Component} from '@tarojs/taro'

export default class ToMother extends Component {
  state = {
  }

  config = {
    navigationBarTitleText: ''
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <web-view src="https://www.1wang.xyz"/>
      </View>
    )
  }
}
