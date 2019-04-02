import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'taro-ui/dist/style/index.scss'
import {AtInput, AtButton} from 'taro-ui'
import './index.less'

export default class Create extends Component {
  state = {
  }

  config = {
    navigationBarTitleText: '员工管理'
  }

  componentDidMount() {
  }

  toSave = () => {

  }

  render() {
    return (
      <View className='slm-create-wrap'>
        <AtInput
          clear
          title='员工姓名'
          type='text'
          placeholder='请输入员工姓名'
          value={this.state.name}
          onChange={this.changeName}
        />
        <AtInput
          clear
          title='身份证号'
          type='idcard'
          placeholder='请输入员工身份证号'
          value={this.state.identity_cards}
          onChange={this.changeIdentity}
        />
        <AtInput
          clear
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.phone}
          onChange={this.changePhone}
        />
        <View>
          <AtButton type='primary' onClick={this.toSave}>保存</AtButton>
        </View>
        <View className='slm-return-btn-wrap'>
          <AtButton type='secondary' onClick={() => {
            this.props.back();
          }}>返回</AtButton>
        </View>
      </View>
    )
  }
}
