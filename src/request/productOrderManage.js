import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';

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
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}

// 确认订单
export const confirmOrder = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}

// 查询我的预定列表
export const querySubscribeList = (params) => {
  // let mock = false;
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝',
        phone: '15068139393',
        subscribeTime: '2019-04-06 13',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝',
        phone: '15068139393',
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
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2024')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}

// 查询用户的充值列表
export const queryChargeRecordList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        rechargeTime: '2019-04-06 12:00:00',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝',
        phone: '15068139393',
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
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}

// 查询用户的消费列表
export const queryConsumeRecordList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        productId: 1,
        productName: '洗澡1',
        name: '泥宝宝',
        phone: '15068139393',
        amount: '168',
        customeTime: '2019-04-06 12:00:00',
        operatorName: '李阿姨',
      },
      {
        id: 2,
        productId: 2,
        productName: '洗澡2',
        name: '泥宝宝',
        phone: '15068139393',
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
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2021')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}


