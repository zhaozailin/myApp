import mock from '../config/mock';
import {forkAjax} from "../ws/forkAjax";

let resolves = {
  list: {},
};

export default resolves;

// 查询客户列表
export const queryClientList = (params) => {
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        nick_name: '泥宝宝1',
        telephone: '15068139393',
        shop_name: '门店1',
      },
      {
        id: 2,
        nick_name: '泥宝宝2',
        telephone: '15068139393',
        shop_name: '门店2',
      },
      {
        id: 3,
        nick_name: '泥宝宝3',
        telephone: '15068139393',
        shop_name: '门店3',
      },
      {
        id: 4,
        nick_name: '泥宝宝4',
        telephone: '15068139393',
        shop_name: '门店4',
      },
      {
        id: 5,
        nick_name: '泥宝宝5',
        telephone: '15068139393',
        shop_name: '门店5',
      }
    ]);
  }
  return forkAjax('2020', params, resolves)
}
