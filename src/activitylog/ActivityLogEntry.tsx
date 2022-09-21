import LootEntry from "./entries/LootEntry";
import {ActivityLogItem, ActivityLogItemType} from "./types";
import CookEntry from "./entries/CookEntry";

interface Props {
  item: ActivityLogItem;
}

const ActivityLogEntry = ({ item }: Props) => {
  switch (item.type) {
    case ActivityLogItemType.LOOT:
      return <LootEntry content={item.content} timestamp={item.timestamp}/>;
    case ActivityLogItemType.COOK:
      return <CookEntry content={item.content} timestamp={item.timestamp} />
    default:
      return null;
  }
};

export default ActivityLogEntry;
