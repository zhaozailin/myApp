import userResolves from '../request/user'

let eventCallback = {};

// 根据userResolves批量生成方法
userResolves.codeList.forEach((code) => {
  eventCallback['cb' + code] = () => {
    let list = userResolves.list;
    list['resolve' + code]();
  }
})

export default eventCallback;
