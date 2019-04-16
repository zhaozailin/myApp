import Taro from '@tarojs/taro'
import {parseResult} from "../utils/request";
import eventCallback from "./eventCallback";

let wsTask;

export const createWs = (requestCode) => {
  return new Promise((resolve) => {
    if (wsTask) {
      resolve(wsTask)
    }
    else {
      Taro.connectSocket({
        url: 'ws://47.110.242.98:5505',
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
      })
    }
  });
}
