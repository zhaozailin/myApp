import {packRequest} from "../utils/request";
import {createWs} from "./index";

export const forkAjax = (requestCode, params, resolves) => {
  return new Promise((resolve) => {
    let list = resolves.list;
    list[resolve + requestCode] = resolve;
    createWs(requestCode, resolve).then((task) => {
      task.send({data: packRequest(params, requestCode)})
    })
  })
}
