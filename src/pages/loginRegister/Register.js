import Taro, {Component} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtInput, AtButton, AtFloatLayout, AtInputNumber} from 'taro-ui'
import {register} from '../../request/user'
import './index.less'
import {checkPhone} from "../../utils/validator";
import {pay} from "../../utils/payUtils";

export default class Register extends Component {
  state = {
    name: '',
    identity_cards: '',
    phone: '',
    shop_address: '',
    referee_name: Taro.getStorageSync('recommendPhone') || '',
    shop_name: '',
    payShow: false,
    yearNum: 1,
    amount: 500,
  }

  config = {
    navigationBarTitleText: '注册'
  }

  changeName = (name) => {
    this.setState({
      name
    })
  }

  changeIdentity = (identity_cards) => {
    this.setState({
      identity_cards
    })
  }

  changeAddress = (shop_address) => {
    this.setState({shop_address})
  }

  changeReferee = (referee_name) => {
    this.setState({referee_name})
  }

  changeShop = (shop_name) => {
    this.setState({shop_name})
  }

  changePhone = (phone) => {
    this.setState({
      phone
    })
  }

  checkRegister = () => {
    if (!this.state.name) {
      Taro.showToast({title: '店长姓名不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.identity_cards) {
      Taro.showToast({title: '身份证号不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.phone) {
      Taro.showToast({title: '手机号不能为空', icon: 'none'})
      return false;
    }
    if (!checkPhone(this.state.phone)) {
      Taro.showToast({title: '手机号格式不正确', icon: 'none'})
      return false;
    }
    if (!this.state.shop_address) {
      Taro.showToast({title: '门店地址不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.referee_name) {
      Taro.showToast({title: '推荐人不能为空', icon: 'none'})
      return false;
    }
    if (!checkPhone(this.state.referee_name)) {
      Taro.showToast({title: '推荐人手机号格式不正确', icon: 'none'})
      return false;
    }
    if (!this.state.shop_name) {
      Taro.showToast({title: '门店名字不能为空', icon: 'none'})
      return false;
    }
    return true;
  }

  toRegister = () => {
    if (this.checkRegister()) {
      register({
        name: this.state.name,
        identity_cards: this.state.identity_cards,
        phone: this.state.phone,
        shop_address: this.state.shop_address,
        referee_name: this.state.referee_name,
        shop_name: this.state.shop_name,
        password: this.state.phone.slice(-6)
      }).then(() => {
        this.setState({payShow: true})
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 500
        })
      })
    }
  }

  // 确认付款
  toPay = () => {
    let totalFee = this.state.amount;
    pay(totalFee, '店长注册', () => {
      this.setState({payShow: false})
    })
  }

  changeYearNum = (yearNum) => {
    this.setState({
      yearNum,
      amount: 99800 * yearNum
    })
  }

  render() {
    return (
      <View className='tab-content'>
        <AtInput
          clear
          title='店长姓名'
          type='text'
          placeholder='请输入店长姓名'
          value={this.state.name}
          onChange={this.changeName}
        />
        <AtInput
          clear
          title='身份证号'
          type='idcard'
          placeholder='请输入店长身份证号'
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
        <AtInput
          clear
          title='门店地址'
          type='text'
          placeholder='请输入门店地址'
          value={this.state.shop_address}
          onChange={this.changeAddress}
        />
        <AtInput
          clear
          title='推荐人'
          type='phone'
          placeholder='请输入推荐人手机号码'
          value={this.state.referee_name}
          onChange={this.changeReferee}
        />
        <AtInput
          clear
          title='门店名字'
          type='text'
          placeholder='请输入门店名字'
          value={this.state.shop_name}
          onChange={this.changeShop}
        />
        <View className='login-btn-wrap'>
          <AtButton type='primary' onClick={this.toRegister}>注册</AtButton>
        </View>

        {this.state.payShow && <AtFloatLayout isOpened title="付款详情" onClose={() => {
          this.setState({payShow: false})
        }}>
          <View className='login-register-pay-wrap'>
            <Text className='login-register-pay-font'>年数 </Text>
            <AtInputNumber
              size={'big'}
              min={1}
              max={100}
              step={1}
              value={this.state.yearNum}
              onChange={this.changeYearNum}
            />
            <View className='login-register-pay-amount-wrap'>
              ￥{this.state.amount}
            </View>
            <AtButton type='primary' onClick={this.toPay}>确认付款</AtButton>
          </View>
        </AtFloatLayout>}
      </View>
    )
  }
}
