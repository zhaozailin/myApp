import Taro from '@tarojs/taro'
import {parseResult} from "../utils/request";

let wsTask;

export const createWs = (requestCode) => {
  return new Promise((resolve) => {
    console.log(wsTask)
    if (wsTask && wsTask.OPEN) {
      resolve(wsTask)
    }
    else {
      Taro.connectSocket({
        url: 'wss://1wang.xyz/websocket',
        success: function () {
          console.log('connect success')
        }
      }).then(task => {
        wsTask = task;
        task.onOpen(() => {
          console.log('onOpen success')
          resolve(task)
        });
        task.onMessage(result => {
          parseResult(requestCode, result.data);
        })
        task.onError(function (e) {
          console.log('onError', e)
        })
        task.onClose(function (e) {
          console.log('onClose: ', e)
          wx.reLaunch({
            url: 'pages/index/index'
          })
        })
      })
    }
  });
}


