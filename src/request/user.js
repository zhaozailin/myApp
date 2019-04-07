import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';
import authCode from '../config/authCode';

// 登录
export const login = (params) => {
  let mock = false;
  if (mock) {
    return Promise.resolve({
      auth: authCode.shopOwner
    });
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2001')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
}

// 注册
export const register = (params) => {
  let mock = false;
  if (mock) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    createWs().then(task => {
      task.onOpen(() => {
        task.send({data: packRequest(params, '2019')})
      });
      task.onMessage(result => {
        resolve(parseResult(result.data));
        task.close();
      })
    })
  })
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


