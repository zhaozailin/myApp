import Taro from '@tarojs/taro'
import authCode from "../config/authCode";

export const initBottomTabList = () => {
  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    return [
      {title: '工单管理', iconType: 'bullet-list'},
      {title: '门店管理', iconType: 'shopping-bag-2'},
      {title: '客户管理', iconType: 'user'}
    ]
  }
  // 店长、员工
  if (Taro.getStorageSync('auth') === authCode.shopOwner || Taro.getStorageSync('auth') === authCode.employe) {
    return [
      {title: '工单管理', iconType: 'bullet-list'},
      {title: '门店管理', iconType: 'shopping-bag-2'},
      {title: '我的门店', iconType: 'user'}
    ]
  }
  return []
}

export const changeBottomTab = (cur) => {
  console.log(cur);
}

export const initOrderTabList = () => {
  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    return [
      {title: '充值记录'},
      {title: '消费记录'}
    ]
  }
  // 店长
  if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    return [
      {title: '我的订单'},
      {title: '我的预约'},
      {title: '充值记录'},
      {title: '消费记录'}
    ]
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    return [
      {title: '我的预约'},
      {title: '消费记录'}
    ]
  }
  return []
}

export const changeOrderTab = (cur) => {
  console.log(cur)
}
