import mock from '../config/mock';
import {forkAjax} from "../ws/forkAjax";

let resolves = {
  list: {},
};

export default resolves;

// 查询门店列表
export const queryShopList = (params) => {
  console.log(params)
  params.check = 0;
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 0,
        shopowner_name: '店长',
        shopowner_identity_cards: '1309211988888888',
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
        shopowner_name: '店长',
        shopowner_identity_cards: '1309211988888888',
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
        shopowner_name: '店长',
        shopowner_identity_cards: '1309211988888888',
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 0,
        shopowner_name: '店长',
        shopowner_identity_cards: '1309211988888888',
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
        shopowner_name: '店长',
        shopowner_identity_cards: '1309211988888888',
      },
    ]);
  }
  return forkAjax('2015', params, resolves)
}

// 改变门店状态
export const changeState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2032', params, resolves)
}

// 查询门店审核列表
export const queryShopCheckList = (params) => {
  console.log(params)
  params.check = 1;
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '门店1',
        addr: '地址1',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 0,
      },
      {
        id: 2,
        name: '门店2',
        addr: '地址2',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
      },
      {
        id: 3,
        name: '门店3',
        addr: '地址3',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
      },
      {
        id: 4,
        name: '门店4',
        addr: '地址4',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 0,
      },
      {
        id: 5,
        name: '门店5',
        addr: '地址5',
        phone: '15068139393',
        expiredate: '2019-05-01',
        active: 1,
      },
    ]);
  }
  return forkAjax('2015', params, resolves)
}

// 确认审核通过
export const confirmCheck = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2031', params, resolves)
}

// 查询员工列表
export const queryEmployeList = (params) => {
  console.log(params)
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '员工1',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 1,
      },
      {
        id: 2,
        name: '员工2',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
      {
        id: 3,
        name: '员工3',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 1,
      },
      {
        id: 4,
        name: '员工4',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
      {
        id: 5,
        name: '员工5',
        identity_cards: '13092112020202020X',
        phone: '15068139393',
        active_status: 0,
      },
    ]);
  }
  return forkAjax('2018', params, resolves)
}

// 改变员工状态
export const changeEmployeState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2017', params, resolves)
}

// 查询产品列表
export const queryProducList = (params) => {
  console.log(params)
  if (mock) {
    return Promise.resolve([
      {
        id: 1,
        name: '洗澡1',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 0,
      },
      {
        id: 2,
        name: '洗澡2',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
      {
        id: 3,
        name: '洗澡3',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 0,
      },
      {
        id: 4,
        name: '洗澡4',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
      {
        id: 5,
        name: '洗澡5',
        url: 'http://xxx',
        count: 10,
        price: 168,
        active_status: 1,
      },
    ]);
  }
  return forkAjax('2012', params, resolves)
}

// 上下架产品
export const changeProductState = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2011', params, resolves)
}

// 新增产品
export const addProduct = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2010', params, resolves)
}

// 编辑产品
export const editProduct = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2011', params, resolves)
}

// 新增门店
export const createShop = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2013', params, resolves)
}

// 修改门店
export const editShop = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2014', params, resolves)
}

// 新增店员
export const createEmploye = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2016', params, resolves)
}

// 修改店员
export const editEmploye = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2017', params, resolves)
}
