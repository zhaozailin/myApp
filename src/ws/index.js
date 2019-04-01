import Taro from '@tarojs/taro'

export const createWs = () => {
  return Taro.connectSocket({
    url: 'ws://47.110.242.98:5505',
    success: function () {
      console.log('connect success')
    }
  });
}
