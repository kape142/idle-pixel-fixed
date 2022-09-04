import LootEntry from "./entries/LootEntry";
import { ActivityLogItem } from "./types";
import { TYPE_LOOT } from "./useActivityLogWebsocketListener";

interface Props {
  item: ActivityLogItem;
}

const ActivityLogEntry = ({ item }: Props) => {
  switch (item.type) {
    case TYPE_LOOT:
      return <LootEntry content={item.content} />;
    default:
      return null;
  }
};

export default ActivityLogEntry;
