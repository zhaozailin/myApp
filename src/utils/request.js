import {getLength} from "./math";
import Taro from '@tarojs/taro'

export const parseResult = (resolve, result) => {
  Taro.hideLoading();
  let resultJson = JSON.parse(result.substring(8))
  if (resultJson.code === 200) {
    resolve(resultJson.data);
  }
  if (resultJson.code === 100) {
    Taro.showToast({title: '账号密码错误', icon: 'none'})
  }
  if (resultJson.code === 101) {
    Taro.showToast({title: '该店长手机号已经被注册', icon: 'none'})
  }
  if (resultJson.code === 103) {
    Taro.showToast({title: '该门店正在审核中', icon: 'none'})
  }
  if (resultJson.code === 106) {
    Taro.showToast({title: '该员工手机号已经被注册', icon: 'none'})
  }

};

export const packRequest = (params, requestId) => {
  Taro.showLoading();
  return requestId + getLength(JSON.stringify(params)) + JSON.stringify(params)
};
