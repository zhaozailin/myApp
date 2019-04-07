import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';

// 查询客户列表
export const queryClientList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '泥宝宝1',
        phone: '15068139393',
        shop_name: '门店1',
      },
      {
        id: 2,
        name: '泥宝宝2',
        phone: '15068139393',
        shop_name: '门店2',
      },
      {
        id: 3,
        name: '泥宝宝3',
        phone: '15068139393',
        shop_name: '门店3',
      },
      {
        id: 4,
        name: '泥宝宝4',
        phone: '15068139393',
        shop_name: '门店4',
      },
      {
        id: 5,
        name: '泥宝宝5',
        phone: '15068139393',
        shop_name: '门店5',
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
