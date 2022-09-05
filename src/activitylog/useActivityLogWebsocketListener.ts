import { useMemo } from "react";
import { useLocalStorage } from "../util/localstorage/useLocalStorage";
import { ActivityLogItem, ActivityLogSettings, LootItem } from "./types";
import {
  consumeWebSocketMessage,
  observeWebSocketMessage,
  useWebsocket,
} from "../util/websocket/useWebsocket";

export const useActivityLogWebSocketListener = (
  settings: ActivityLogSettings
) => {
  const [list, setList] = useLocalStorage<ActivityLogItem[]>(
    "activity-log",
    [],
    "useActivityLogWebSocketListener"
  );

  const onMessageFactory = useMemo(
    () =>
      settings.blockDialogues
        ? consumeWebSocketMessage
        : observeWebSocketMessage,
    [settings.blockDialogues]
  );

  const onMessage = useMemo(
    () =>
      onMessageFactory("OPEN_LOOT_DIALOGUE", (data) => {
        //OPEN_LOOT_DIALOGUE=none~images/junk.png~30 Junk~#cce6ff~images/stone.png~3 Stone~#cce6ff
        const activityLogItem = lootDialogueParser(data);
        setList((list) => [activityLogItem].concat(list));
      }),
    [onMessageFactory]
  );

  useWebsocket(onMessage, 1000, "useActivityLogWebSocketListener");

  return list;
};

export const TYPE_LOOT = "LOOT";

const lootDialogueParser = (data: string): ActivityLogItem => {
  const dataArray = data.split("~");
  return {
    type: TYPE_LOOT,
    timestamp: new Date(),
    content: {
      extraData: dataArray[0],
      items: dataArray
        .slice(1)
        .reduce<Partial<LootItem>[]>((acc, cur, j) => {
          const i = Math.floor(j / 3);
          if (!acc[i]) acc[i] = {};
          if (j % 3 === 0) acc[i].image = cur;
          if (j % 3 === 1) acc[i].label = cur;
          if (j % 3 === 2) acc[i].background = cur;
          return acc;
        }, [])
        .map((item) => item as LootItem),
    },
  };
};
