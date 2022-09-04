import { OnMessageFunc } from "../idle-pixel/WebSocket";

export const onMessage = (func: (ev: MessageEvent<string>) => MessageEvent<string>) => {
  const old: OnMessageFunc | null = websocket.connected_socket.onmessage as OnMessageFunc | null
  websocket.connected_socket.onmessage = function(ev: MessageEvent<string>) {
    const updatedEv = func(ev)
    if(old) old(updatedEv)
  };
};

export const observeWebSocketMessage = (type: string, observe: (data: string) => void) => {
  onMessage((ev) => {
    const {type: foundType, data} = websocketMessageSplit(ev.data)
    if(type === foundType){
      observe(data)
    }
    return ev
  })
}

export const consumeWebSocketMessage = (type: string, consume: (data: string) => void) => {
  onMessage((ev) => {
    const {type: foundType, data} = websocketMessageSplit(ev.data)
    if(type === foundType){
      consume(data)
      return Object.assign({}, ev, {data: ""})
    }
    return ev
  })
}

interface WebsocketMessageSplit {
  type: string,
  data: string
}

export const websocketMessageSplit = (message: string): WebsocketMessageSplit => {
  const split = message.split("=")
  return {type: split[0], data: split[1]}
}