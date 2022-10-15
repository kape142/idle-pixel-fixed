import IPimg from "../../util/IPimg";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { Smelting } from "./CraftingOverview";
import {
  showElementById,
  updateTextContentById,
} from "../../util/domOperations";

interface Props {
  ore: string;
  disabled: boolean;
  setSmelting: (smelting: Smelting) => void;
  oil: number;
}

const OreDisplay = ({ ore, disabled, setSmelting, oil }: Props) => {
  const furnaceCapacity = Number(Furnace.getFurnaceCapacity());
  const [amount, setAmount] = useNumberItemObserver(ore, `OreDisplay-${ore}`);
  const oilPerBar = Crafting.getOilPerBar(ore);

  const onClick = (event: MouseEvent) => {
    const maxAmount = Math.floor(Math.min(oil / oilPerBar, amount));
    let making = Math.min(furnaceCapacity, maxAmount);
    if (event.ctrlKey) {
      making = Math.min(5, maxAmount);
    } else if (event.shiftKey) {
      making = Math.floor(making / 2);
    }
    if (making > 0) {
      setSmelting({
        type: ore,
        amountAt: 0,
        amountSet: making,
      });
      setAmount(amount - making);
      updateTextContentById("notification-furnace-label", `0/${making}`);
      showElementById("notification-furnace");
      sendMessage("SMELT", ore, making);
    }
  };

  const unselectable = disabled || amount === 0 || oil < oilPerBar;

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
        name={ore}
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
      />
      <span>{formattedAmount}</span>
    </div>
  );
};

export default OreDisplay;
