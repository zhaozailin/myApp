import {createWs} from '../ws/index';
import mock from '../config/mock';
import {parseResult, packRequest} from '../utils/request';

// 登录
export const login = (params) => {
  if (mock) {
    return Promise.resolve({});
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

// 获取登录用户信息
export const queryUserInfo = (params) => {
  if (mock) {
    return Promise.resolve({
      // 1-管理员，2-店长，3-员工
      auth: 1,
      shopId: 1
    });
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


