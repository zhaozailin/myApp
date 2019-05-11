import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtInput, AtButton, AtListItem, AtList} from 'taro-ui'
import './index.less'
import {checkPhone} from "../../utils/validator";
import {editEmploye, createEmploye} from "../../request/shopProductManage";

export default class Create extends Component {
  state = {
    id: '',
    name: '',
    identity_cards: '',
    phone: '',
    active_status: false,

    isEdit: false,
  }

  config = {
    navigationBarTitleText: '员工管理'
  }

  checkSave = () => {
    if (!this.state.name) {
      Taro.showToast({title: '姓名不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.identity_cards) {
      Taro.showToast({title: '身份证号不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.isEdit && !this.state.phone) {
      Taro.showToast({title: '手机号不能为空', icon: 'none'})
      return false;
    }
    if (!this.state.isEdit && !checkPhone(this.state.phone)) {
      Taro.showToast({title: '手机号格式不正确', icon: 'none'})
      return false;
    }
    return true;
  }

  toSave = () => {
    if (this.checkSave()) {
      // 修改
      if (this.state.id) {
        editEmploye({
          id: this.state.id,
          name: this.state.name,
          identity_cards: this.state.identity_cards,
          active_status: this.state.active_status ? 0 : 1,
          shop_id: Taro.getStorageSync('shopId')
        }).then(() => {
          Taro.showToast({title: '修改成功', icon: 'none'})
          this.props.onBack();
        });
      }
      // 新增
      else {
        createEmploye({
          name: this.state.name,
          identity_cards: this.state.identity_cards,
          phone: this.state.phone,
          active_status: this.state.active_status ? 0 : 1,
          password: this.state.phone.slice(-5),
          shop_id: Taro.getStorageSync('shopId')
        }).then(() => {
          Taro.showToast({title: '新增成功', icon: 'none'})
          this.props.onBack();
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.employe.id) {
      let info = Object.assign({}, this.props.employe)
      this.setState({
        isEdit: true,
        id: info.id,
        name: info.name,
        identity_cards: info.identity_cards,
        phone: info.phone,
        active_status: !info.active_status,
      })
    }
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

  changePhone = (phone) => {
    this.setState({
      phone
    })
  }

  changeState = (data) => {
    this.setState({
      active_status: data.detail.value
    })
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
        {!this.state.isEdit &&
        <AtInput
          clear
          title='手机号码'
          type='phone'
          placeholder='请输入手机号码'
          value={this.state.phone}
          onChange={this.changePhone}
          maxLength={11}
        />
        }
        <AtList>
          <AtListItem
            title='状态'
            isSwitch
            switchIsCheck={!this.state.active_status}
            onSwitchChange={this.changeState}
          />
        </AtList>
        <View>
          <AtButton type='primary' onClick={this.toSave}>保存</AtButton>
        </View>
        <View className='slm-return-btn-wrap'>
          <AtButton type='secondary' onClick={() => {
            this.props.onBack();
          }}>返回</AtButton>
        </View>
      </View>
    )
  }
}
