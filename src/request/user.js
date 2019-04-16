import mock from '../config/mock';
import authCode from '../config/authCode';
import {forkAjax} from '../ws/forkAjax';

let resolves = {
  list: {},
};

export default resolves;

// 登录
export const login = (params) => {
  if (mock) {
    return Promise.resolve({
      auth: authCode.manager
    });
  }
  return forkAjax('2001', params, resolves)
}

// 注册
export const register = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2030', params, resolves)
}

// 获取登录用户信息
export const queryUserInfo = (params) => {
  if (mock) {
    return Promise.resolve({
      // 1-管理员，2-店长，3-员工
      auth: authCode.shopOwner,
      shopId: 1
    });
  }
  return forkAjax('2021', params, resolves)
}

// 获取门店信息
export const queryShopInfo = (params) => {
  if (mock) {
    return Promise.resolve({
      name: '店长1',
      phone: '15068140482',
      addr: '地址',
      expiredate: '2020-03-10',
      warn: true,
    });
  }
  return forkAjax('2027', params, resolves)
}

// 续费
export const renewSuccess = (params) => {
  if (mock) {
    return Promise.resolve({});
  }
  return forkAjax('2033', params, resolves)
}
