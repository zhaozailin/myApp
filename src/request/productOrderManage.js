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
        resolve(parseResult(result));
        task.close();
      })
    })
  })
}
