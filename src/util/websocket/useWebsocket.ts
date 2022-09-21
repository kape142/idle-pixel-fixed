import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import {
  addWebsocketConsumer,
  removeWebsocketConsumer,
  selectWebsocketConsumers,
} from "./websocketReducer";
import { useEffect, useMemo, useRef } from "react";

export const useWebsocket = (
  onMessage: (ev: MessageEvent<string>) => MessageEvent<string>,
  priority: number,
  id: string
) => {
  const oldOnMessage = useRef(websocket.connected_socket.onmessage);

  const dispatch = useIPFDispatch();
  const consumers = useIPFSelector(selectWebsocketConsumers);

  const functions = useMemo(
    () =>
      consumers
        .concat([
          {
            onMessage: oldOnMessage.current ?? trivialOnMessage,
            priority: 0,
            id: "smitty",
          },
        ])
        .sort((a, b) => b.priority - a.priority)
        .map((consumer) => consumer.onMessage),
    [consumers]
  );

  useEffect(() => {
    dispatch(
      addWebsocketConsumer({
        onMessage,
        priority,
        id,
      })
    );
    return () => {
      dispatch(removeWebsocketConsumer(id));
    };
  }, [onMessage, priority, id]);

  useEffect(() => {
    websocket.connected_socket.onmessage = (ev: MessageEvent<string>) => {
      functions.reduce((acc, cur) => cur(acc), ev);
    };
  }, [consumers]);
};

const trivialOnMessage = (ev: MessageEvent<string>) => ev;

export const observeWebSocketMessage =
  (type: string, observe: (data: string) => void) =>
  (ev: MessageEvent<string>) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      observe(data);
    }
    return ev;
  };

export const consumeWebSocketMessage =
  (type: string, consume: (data: string) => void) =>
  (ev: MessageEvent<string>) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      consume(data);
      return Object.assign({}, ev, { data: "" });
    }
    return ev;
  };

export const replaceWebSocketMessage =
  (type: string, replace: (data: string) => string) =>
  (ev: MessageEvent<string>) => {
    const { type: foundType, data } = websocketMessageSplit(ev.data);
    if (type === foundType) {
      const newData = replace(data);
      return Object.assign({}, ev, { data: newData });
    }
    return ev;
  };

interface WebsocketMessageSplit {
  type: string;
  data: string;
}

export const websocketMessageSplit = (
  message: string
): WebsocketMessageSplit => {
  const split = message.split("=");
  return { type: split[0], data: split[1] };
};

export const sendMessage = (type: string, ...values: (string | number)[]) =>
  websocket.connected_socket.send(`${type}=${values.join("~")}`);
