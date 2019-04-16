import {packRequest} from "../utils/request";
import {createWs} from "./index";

export const forkAjax = (requestCode, params, resolves) => {
  return new Promise((res) => {
    let list = resolves.list;
    list['resolve' + requestCode] = res;
    createWs(requestCode).then((task) => {
      task.send({data: packRequest(params, requestCode)})
    })
  })
}
