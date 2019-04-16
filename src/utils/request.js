import {getLength} from "./math";
import Taro from '@tarojs/taro'
import eventCallback from "../ws/eventCallback";

export const parseResult = (requestCode, result) => {
  Taro.hideLoading();

  let reqCode = result.substring(0, 4);

  let resultJson = JSON.parse(result.substring(8));
  if (resultJson.code === 200) {
    eventCallback['cb' + reqCode](resultJson.data)
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
