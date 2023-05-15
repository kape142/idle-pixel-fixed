import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import Tooltip from "../../util/tooltip/Tooltip";
import { pluralMarker } from "../../util/stringUtils";
interface Props {
  prism: string;
}

const PrismDisplay = ({ prism }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(
    prism + "_stardust_prism",
    `PrismDisplay-${prism}`
  );

  const onPrismClick = (event: MouseEvent) => {
    hideTooltip();
    if (event.shiftKey) {
      setAmount(amount - (amount - 1));
      sendMessage("SMASH_STARDUST_PRISM", prism + "_stardust_prism", amount - 1);
    } else {
      setAmount(0);
      sendMessage("SMASH_STARDUST_PRISM", prism + "_stardust_prism", amount);
    }
  };

  const [prismProps, PrismToolTip, hideTooltip] = useTooltip(
    [
      <Tooltip
        text={`Smash ${amount} ${Items.get_pretty_item_name(prism)} Prism${pluralMarker(amount)}`}
      />,
      <Tooltip
        text={`Smash ${amount - 1} ${Items.get_pretty_item_name(prism)} Prism${pluralMarker(amount)}`}
      />
    ]
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
        name={prism + "_stardust_prism"}
        size={30}
        onClick={onPrismClick}
        {...prismProps}
      />
      <span>{amount}</span>
      <PrismToolTip />
    </div>
  ) : null;
};

export default PrismDisplay;
