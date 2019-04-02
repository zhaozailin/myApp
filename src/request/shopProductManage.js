import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';

// 查询门店列表
export const queryShopList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
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

// 查询门店审核列表
export const queryShopCheckList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 0,
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        account: '150599595',
        phone: '15068139393',
        expiredate: '2019-05-01',
        status: 1,
      },
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

