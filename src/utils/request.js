import {getLength} from "./math";

export const parseResult = (result) => {
    let resultJson = JSON.parse(result.substring(8))
    if (resultJson.code === 200) {
        return resultJson.data;
    }
};

export const packRequest = (params, requestId) => {
  return requestId + getLength(JSON.stringify(params)) + JSON.stringify(params)
};
