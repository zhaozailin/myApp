import {packRequest} from "../utils/request";
import {createWs} from "./index";
import Taro from '@tarojs/taro'

export const forkAjax = (requestCode, params, resolves) => {
  return new Promise((res) => {
    let list = resolves.list;
    list['resolve' + requestCode] = res;
    createWs(requestCode).then((task) => {
      params.globalAuth = Taro.getStorageSync('auth');
      task.send({data: packRequest(params, requestCode)})
    })
  })
}
