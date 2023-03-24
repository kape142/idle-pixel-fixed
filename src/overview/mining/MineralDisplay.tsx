import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import Tooltip from "../../util/tooltip/Tooltip";

interface Props {
  mineral: string;
}

const MineralDisplay = ({ mineral }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(
    mineral,
    `MineralDisplay-${mineral}`
  );

  const onMineralClick = (event: MouseEvent) => {
    hideTooltip();
    if (event.shiftKey) {
      setAmount(0);
      sendMessage("MINERAL_XP", mineral, amount);
    } else if (event.ctrlKey) {
      Modals.open_custom_crafting(mineral);
    } else {
      Modals.clicks_mineral(mineral);
    }
  };

  const [mineralProps, MineralToolTip, hideTooltip] = useTooltip(
    [
      <Tooltip
        text={`Use ${amount} ` + Items.get_pretty_item_name(mineral) + `(s)`}
        postText={"(with confirmation)"}
      />,
      <Tooltip
        text={`Convert ${amount} ` + Items.get_pretty_item_name(mineral) + `(s) into ` + Ores.MINERALS_XP_MAP[mineral] * amount + ` mining xp`}
        postText={"(no confirmation)"}
      />,
      <Tooltip
        text={`Craft rings with ${amount} ` + Items.get_pretty_item_name(mineral) + `(s)`}
        postText={"(with confirmation)"}
      />
    ],
    {
      width: 260
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
        name={mineral}
        size={30}
        onClick={onMineralClick}
        {...mineralProps}
      />
      <span>{amount}</span>
      <MineralToolTip />
    </div>
  ) : null;
};

export default MineralDisplay;
