import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtInput, AtButton} from 'taro-ui'
import './index.less'
import {checkPhone} from "../../utils/validator";
import {createShop} from "../../request/shopProductManage";

export default class Create extends Component {
  state = {
    name: '',
    identity_cards: '',
    shop_address: '',
    shop_name: '',
    phone: '',
  }

  config = {
    navigationBarTitleText: '门店管理'
  }

  componentDidMount() {
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

  changeShop = (shop_name) => {
    this.setState({shop_name})
  }

  changePhone = (phone) => {
    this.setState({
      phone
    })
  }

  checkSave = () => {
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
    if (!this.state.shop_name) {
      Taro.showToast({title: '门店名字不能为空', icon: 'none'})
      return false;
    }
    return true;
  }

  toSave = () => {
    if (this.checkSave()) {
      createShop({
        name: this.state.name,
        identity_cards: this.state.identity_cards,
        shop_address: this.state.shop_address,
        shop_name: this.state.shop_name,
        phone: this.state.phone,
        password: this.state.phone.slice(-4)
      }).then(() => {
        Taro.showToast({title: '新增成功', icon: 'none'})
        this.props.back();
      });
    }
  }

  render() {
    return (
      <View className='slm-create-wrap'>
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
          title='门店名字'
          type='text'
          placeholder='请输入门店名字'
          value={this.state.shop_name}
          onChange={this.changeShop}
        />
        <View className='slm-btn-wrap'>
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
