import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import GeodeTooltip from "./GeodeTooltip";

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
    if (event.ctrlKey) {
      setAmount(amount - 1);
      sendMessage("CRACK_GEODE", geode + "_geode", 1);
    } else if (event.shiftKey) {
      setAmount(0);
      sendMessage("CRACK_GEODE", geode + "_geode", amount);
    } else {
      Modals.open_input_dialogue_with_value(geode + "_geode", "Open", "How many geodes to you want to crack?", amount, "CRACK_GEODE");
    }
  };

  const tooltipProps = {
    geode: geode,
  };

  const [geodeProps, GeodeToolTip, hideTooltip] = useTooltip(
    <GeodeTooltip amount={amount} postText="(With confirmation)" {...tooltipProps} />,
    <GeodeTooltip amount={amount} postText="(No confirmation)" {...tooltipProps} />,
    <GeodeTooltip amount={1} {...tooltipProps} />
  );

  return amount > 0 ? (
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
