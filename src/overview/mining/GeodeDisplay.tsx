import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import Tooltip from "./Tooltip";

interface Props {
  geode: string;
}

const GeodeDisplay = ({ geode }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(
    geode + "_geode",
    `GeodeDisplay-${geode}`
  );

  const onGeodeClick = (event: MouseEvent) => {
    hideTooltip();
    if (event.shiftKey) {
      setAmount(amount - 1);
      sendMessage("CRACK_GEODE", geode + "_geode", amount - 1);
    } else {
      setAmount(amount);
      sendMessage("CRACK_GEODE", geode + "_geode", amount);
    }
  };

  const tooltipProps = {
    geode: geode,
  };

  const [geodeProps, GeodeToolTip, hideTooltip] = useTooltip(
    [
      <Tooltip
        text={`Crack ${amount} ` + Items.get_pretty_item_name(geode) + ` Geode(s).`}
        {...tooltipProps}
      />,
      <Tooltip
        text={`Crack ${amount - 1} ` + Items.get_pretty_item_name(geode) + ` Geode(s).`}
        {...tooltipProps}
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
        name={geode + "_geode"}
        size={30}
        onClick={onGeodeClick}
        {...geodeProps}
      />
      <span>{amount}</span>
      <GeodeToolTip />
    </div>
  ) : null;
};

export default GeodeDisplay;
