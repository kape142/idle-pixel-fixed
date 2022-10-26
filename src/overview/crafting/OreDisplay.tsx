import IPimg from "../../util/IPimg";
import React, { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { Smelting } from "./CraftingOverview";
import {
  showElementById,
  updateTextContentById,
} from "../../util/domOperations";
import { formatNumber } from "../../util/numberUtils";
import { useTooltip } from "../../util/tooltip/useTooltip";
import OreTooltip from "./OreTooltip";

interface Props {
  ore: string;
  disabled: boolean;
  setSmelting: (smelting: Smelting) => void;
  oil: number;
  setOil: (oil: number) => void;
  charcoal: number;
  setCharcoal: (charcoal: number) => void;
  lava: number;
  setLava: (lava: number) => void;
}

const OreDisplay = ({
  ore,
  disabled,
  setSmelting,
  oil,
  setOil,
  charcoal,
  setCharcoal,
  lava,
  setLava,
}: Props) => {
  const furnaceCapacity = Number(Furnace.getFurnaceCapacity());
  const [amount, setAmount] = useNumberItemObserver(ore, `OreDisplay-${ore}`);
  const oilPerBar = Crafting.getOilPerBar(ore);
  const charcoalPerBar = Crafting.getCharcoalPerBar(ore);
  const lavaPerBar = Crafting.getLavaPerBar(ore);

  const getSmeltable = () => {
    const maxAmountOil = Math.floor(
      Math.min(oil / oilPerBar || Infinity, amount)
    );
    const maxAmountCharcoal = Math.floor(
      Math.min(charcoal / charcoalPerBar || Infinity, amount)
    );
    const maxAmountLava = Math.floor(
      Math.min(lava / lavaPerBar || Infinity, amount)
    );
    const maxAmount = Math.min(maxAmountOil, maxAmountCharcoal, maxAmountLava);
    return Math.min(furnaceCapacity, maxAmount);
  };

  const onClick = (event: MouseEvent) => {
    let making = getSmeltable();
    if (event.ctrlKey) {
      making = Math.min(5, making);
    } else if (event.shiftKey) {
      making = Math.floor(making / 2);
    }
    if (making > 0) {
      setSmelting({
        type: ore,
        amountAt: 0,
        amountSet: making,
      });
      if(amount === making){
        hideTooltip();
      }
      setAmount(amount - making);
      setOil(oil - making * oilPerBar);
      setCharcoal(charcoal - making * charcoalPerBar);
      setLava(lava - making * lavaPerBar);
      updateTextContentById("notification-furnace-label", `0/${making}`);
      showElementById("notification-furnace");
      sendMessage("SMELT", ore, making);
    }
  };

  const tooltipProps = {
    ore,
    oilPerBar,
    charcoalPerBar,
    lavaPerBar,
  };

  const [oreProps, OreToolTips, hideTooltip] = useTooltip(
    <OreTooltip amount={getSmeltable()} {...tooltipProps} />,
    <OreTooltip
      amount={Math.max(Math.floor(getSmeltable() / 2), 1)}
      {...tooltipProps}
    />,
    <OreTooltip amount={Math.min(getSmeltable(), 5)} {...tooltipProps} />
  );

  const unselectable =
    disabled ||
    amount === 0 ||
    oil < oilPerBar ||
    charcoal < charcoalPerBar ||
    lava < lavaPerBar;

  const formattedAmount = formatNumber(amount);

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
        {...oreProps}
      />
      <span>{formattedAmount}</span>
      {!unselectable && <OreToolTips />}
    </div>
  );
};

export default OreDisplay;
