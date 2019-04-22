import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtInput, AtButton, AtListItem, AtList} from 'taro-ui'
import {addProduct, editProduct} from '../../request/shopProductManage'
import './index.less'

export default class Edit extends Component {
  state = {
    price: '',
    count: '',
    active_status: false,
  }

  componentDidMount = () => {
    let detail = this.props.product;
    this.setState({
      price: detail.price || '',
      count: detail.count || '',
      active_status: !!detail.active_status,
    })
  }

  config = {
    navigationBarTitleText: '编辑商品'
  }

  changeCount = (count) => {
    this.setState({count})
  }

  changePrice = (price) => {
    this.setState({price})
  }

  changeState = (data) => {
    this.setState({
      active_status: data.detail.value
    })
  }

  checkValid = () => {
    if (!this.state.price) {
      Taro.showToast({title: '请输入单价', icon: 'none'});
      return false;
    }
    if (!this.state.count) {
      Taro.showToast({title: '请输入数量', icon: 'none'});
      return false;
    }
    return true;
  }

  toAdd = () => {
    if (this.checkValid()) {
      addProduct({
        shopId: Taro.getStorageSync('shopId'),
        price: parseInt(this.state.price),
        count: parseInt(this.state.count),
        active_status: this.state.active_status ? 1 : 0,
        url: this.props.product.url,
        name: this.props.product.name,
      }).then(() => {
        this.props.onBack();
      })
    }
  }

  toEdit = () => {
    if (this.checkValid()) {
      editProduct({
        id: this.props.product.id,
        price: parseInt(this.state.price),
        count: parseInt(this.state.count),
        active_status: this.state.active_status ? 1 : 0,
        url: this.props.product.url,
        name: this.props.product.name,
      }).then(() => {
        this.props.onBack();
      })
    }
  }

  render() {
    return (
      <View className='slm-create-wrap'>
        <View>
          <Image
            className='plm-edit-img'
            src={this.props.product.url}
            mode='widthFix' />
        </View>
        <AtInput
          title='名称'
          type='text'
          editable={false}
          value={this.props.product.name}
        />
        <AtInput
          clear
          title='单价'
          type='number'
          placeholder='请输入单价'
          value={this.state.price}
          onChange={this.changePrice}
        />
        <AtInput
          clear
          title='数量'
          type='number'
          placeholder='请输入数量'
          value={this.state.count}
          onChange={this.changeCount}
        />
        <AtList>
          <AtListItem
            title='状态'
            isSwitch
            switchIsCheck={this.state.active_status}
            onSwitchChange={this.changeState}
          />
        </AtList>
        <View className='slm-return-btn-wrap'>
          <AtButton type='primary' onClick={this.toAdd}>新增</AtButton>
        </View>
        <View className='slm-return-btn-wrap'>
          <AtButton type='secondary' onClick={this.toEdit}>保存</AtButton>
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
