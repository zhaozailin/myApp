import mock from '../config/mock';
import {forkAjax} from "../ws/forkAjax";

let resolves = {
  list: {},
};

export default resolves;

// 查询我的订单列表
export const queryOrderList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
      },
      {
        id: 3,
        productId: 3,
        productName: '洗澡3',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
      },
      {
        id: 4,
        productId: 4,
        productName: '洗澡4',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
      },
      {
        id: 5,
        productId: 5,
        productName: '洗澡5',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
      }
    ]);
  }
  return forkAjax('2021', params, resolves)
}

// 确认订单
export const confirmOrder = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2021', params, resolves)
}

// 查询我的预定列表
export const querySubscribeList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝1',
        phone: '15068139393',
        subscribeTime: '2019-04-06 13',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝2',
        phone: '15068139392',
        subscribeTime: '2019-04-06 13',
      },
      {
        id: 3,
        productId: 3,
        productName: '洗澡3',
        name: '泥宝宝',
        phone: '15068139393',
        subscribeTime: '2019-04-06 13',
      },
      {
        id: 4,
        productId: 4,
        productName: '洗澡4',
        name: '泥宝宝',
        phone: '15068139393',
        subscribeTime: '2019-04-06 13',
      },
      {
        id: 5,
        productId: 5,
        productName: '洗澡5',
        name: '泥宝宝',
        phone: '15068139393',
        subscribeTime: '2019-04-06 13',
      }
    ]);
  }
  return forkAjax('2024', params, resolves)
}

// 确认预约
export const confirmSubscribe = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2021', params, resolves)
}

// 查询用户的充值列表
export const queryChargeRecordList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝1',
        phone: '15068139393',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝2',
        phone: '15068139392',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      },
      {
        id: 3,
        productId: 3,
        productName: '洗澡3',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      },
      {
        id: 4,
        productId: 4,
        productName: '洗澡4',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      },
      {
        id: 5,
        productId: 5,
        productName: '洗澡5',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      }
    ]);
  }
  return forkAjax('2023', params, resolves)
}

// 查询用户的消费列表
export const queryConsumeRecordList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝1',
        phone: '15068139393',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝2',
        phone: '15068139392',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      },
      {
        id: 3,
        productId: 3,
        productName: '洗澡3',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      },
      {
        id: 4,
        productId: 4,
        productName: '洗澡4',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      },
      {
        id: 5,
        productId: 5,
        productName: '洗澡5',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      }
    ]);
  }
  return forkAjax('2026', params, resolves)
}


