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
  let url;

  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    if (cur === 0) {
      url = '/pages/chargeRecordList/index'
    }
    else if (cur === 1) {
      url = '/pages/shopListManage/index'
    }
    else if (cur === 2) {
      url = '/pages/clientManage/index'
    }
  }
  // 店长
  else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    if (cur === 0) {
      url = '/pages/myOrderList/index'
    }
    else if (cur === 1) {
      url = '/pages/employeListManage/index'
    }
    else if (cur === 2) {
      url = '/pages/myShop/index'
    }
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    if (cur === 0) {
      url = '/pages/mySubscribeList/index'
    }
    else if (cur === 1) {
      url = '/pages/employeListManage/index'
    }
    else if (cur === 2) {
      url = '/pages/myShop/index'
    }
  }

  Taro.redirectTo({
    url
  })
}

// 工单管理tab列表
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
  let url;

  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    if (cur === 0) {
      url = '/pages/chargeRecordList/index'
    }
    else if (cur === 1) {
      url = '/pages/consumeRecordList/index'
    }
  }
  // 店长
  else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    if (cur === 0) {
      url = '/pages/myOrderList/index'
    }
    else if (cur === 1) {
      url = '/pages/mySubscribeList/index'
    }
    else if (cur === 2) {
      url = '/pages/chargeRecordList/index'
    }
    else if (cur === 3) {
      url = '/pages/consumeRecordList/index'
    }
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    if (cur === 0) {
      url = '/pages/mySubscribeList/index'
    }
    else if (cur === 1) {
      url = '/pages/consumeRecordList/index'
    }
  }

  Taro.redirectTo({
    url
  })
}

// 判断'我的预约'在当前tab中的索引
export const initOrderTabCurForSubscribe = () => {
  // 店长
  if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    return 1;
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    return 0;
  }
}

// 判断'充值记录'在当前tab中的索引
export const initOrderTabCurForCharge = () => {
  if (Taro.getStorageSync('auth') === authCode.manager) {
    return 0;
  }
  if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    return 2;
  }
}

// 判断'消费记录'在当前tab中的索引
export const initOrderTabCurForConsume = () => {
  if (Taro.getStorageSync('auth') === authCode.manager) {
    return 1;
  }
  if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    return 3;
  }
  if (Taro.getStorageSync('auth') === authCode.employe) {
    return 1;
  }
}

// 门店管理tab列表
export const initShopTabList = () => {
  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    return [
      {title: '门店列表'},
      {title: '门店审核'},
      // {title: '员工管理'},
      // {title: '商品管理'}
    ]
  }
  // 店长
  if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    return [
      {title: '员工管理'},
      {title: '商品管理'}
    ]
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    return [
      {title: '员工管理'},
    ]
  }
  return []
}

export const changeShopTab = (cur) => {
  let url;

  // 管理员
  if (Taro.getStorageSync('auth') === authCode.manager) {
    if (cur === 0) {
      url = '/pages/shopListManage/index'
    }
    else if (cur === 1) {
      url = '/pages/shopCheckList/index'
    }
  }
  // 店长
  else if (Taro.getStorageSync('auth') === authCode.shopOwner) {
    if (cur === 0) {
      url = '/pages/employeListManage/index'
    }
    else if (cur === 1) {
      url = '/pages/productListManage/index'
    }
  }
  // 员工
  if (Taro.getStorageSync('auth') === authCode.employe) {
    if (cur === 0) {
      url = '/pages/employeListManage/index'
    }
  }

  Taro.redirectTo({
    url
  })
}
