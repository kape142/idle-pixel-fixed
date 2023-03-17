import IPimg from "../../util/IPimg";
import React, { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { useTooltip } from "../../util/tooltip/useTooltip";
import GatheringBagTooltip from "./GatheringBagTooltip";

interface Props {
  area: string;
}

const GatheringBagDisplay = ({ area }: Props) => {
  const itemName = `gathering_loot_bag_${area}`;
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
      if (making === amount) {
        hideTooltip();
      }
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

  const tooltipProps = {
    area: area,
    maxAmount: amount,
  };

  const [bagProps, BagToolTip, hideTooltip] = useTooltip(
    [
      <GatheringBagTooltip amount={amount} {...tooltipProps} />,
      <GatheringBagTooltip
        amount={Math.max(Math.floor(amount / 2), 1)}
        {...tooltipProps}
      />,
      <GatheringBagTooltip amount={Math.min(5, amount)} {...tooltipProps} />
    ],
    {
      width: 350,
    }
  );

  return amount > 0 ? (
    <div
      style={{
        position: "relative",
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
        {...bagProps}
      />
      <span>{formattedAmount}</span>
      <BagToolTip />
    </div>
  ) : null;
};

export default GatheringBagDisplay;
