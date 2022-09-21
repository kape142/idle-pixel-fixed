import IPimg from "../../util/IPimg";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";

interface Props {
  area: string;
}

const GatheringBagDisplay = ({ area }: Props) => {
  const itemName = `gathering_loot_bag_${area}`
  const [amount, setAmount] = useNumberItemObserver(
    itemName,
    `GatheringBagDisplay-${area}`
  );

  const onClick = (event: MouseEvent) => {
    let making = amount;
    if (event.ctrlKey) {
      making = Math.min(5, making);
    } else if (event.shiftKey) {
      making = Math.floor(making / 2);
    }
    if (making > 0) {
      setAmount(amount - making);
      sendMessage("OPEN_GATHERING_LOOT", area, making);
    }
  };

  const unselectable = amount <= 0;

  const formattedAmount =
    amount < 1_000
      ? `${amount}`
      : amount < 1_000_000
      ? `${(amount / 1_000).toFixed(5 - Math.floor(Math.log10(amount)))}k`
      : `${(amount / 1_000_000).toFixed(8 - Math.floor(Math.log10(amount)))}m`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50px",
        alignItems: "center",
      }}
    >
      <IPimg
        role="button"
        name={itemName}
        size={30}
        style={
          unselectable
            ? {
                opacity: 0.5,
                cursor: "default",
              }
            : undefined
        }
        onClick={unselectable ? undefined : onClick}
        title={Items.get_pretty_item_name(itemName)}
      />
      <span>{formattedAmount}</span>
    </div>
  );
};

export default GatheringBagDisplay;
