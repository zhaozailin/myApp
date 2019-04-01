import WebSocketAsPromised from "websocket-as-promised";
import {getLength} from "../utils/math";

const wsp = new WebSocketAsPromised('ws://47.110.242.98:5505', {
    packMessage: data => data,
    unpackMessage: message => message,
    attachRequestId: (data, requestId) => requestId + getLength(JSON.stringify(data))+ JSON.stringify(data), // attach requestId to message as `id` field
    extractRequestId: message => message && message.substring(0, 4),                                  // read requestId from message `id` field
});

export default wsp;
