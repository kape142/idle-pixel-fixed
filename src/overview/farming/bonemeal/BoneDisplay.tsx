import { sendMessage } from "../../../util/websocket/useWebsocket";
import React, { MouseEvent } from "react";
import { useNumberItemObserver } from "../../setItems/useSetItemsObserver";
import IPimg from "../../../util/IPimg";
import { useTooltip } from "../../../util/tooltip/useTooltip";
import BoneTooltip from "./BoneTooltip";

interface Props {
  bone: string;
  bonemealValue: number;
  bonemeal: number;
  setBonemeal: (bonemeal: number) => void;
}

const id = "BoneDisplay";
const BoneDisplay = ({ bone, bonemealValue, bonemeal, setBonemeal }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(bone, id);

  const onClick = (event: MouseEvent) => {
    let adding = amount;
    if (event.ctrlKey) {
      adding = Math.min(5, adding);
    } else if (event.shiftKey) {
      adding = Math.floor(adding / 2);
    }
    if (adding > 0) {
      if (adding === amount) {
        hideTooltip();
      }
      setAmount(amount - adding);
      setBonemeal(bonemeal + adding * bonemealValue);
      sendMessage("ADD_BONEMEAL", bone, adding);
    }
  };

  const tooltipProps = {
    bone,
    bonemealValue,
  };

  const [boneProps, BoneTooltips, hideTooltip] = useTooltip(
    [
      <BoneTooltip amount={amount} {...tooltipProps} />,
      <BoneTooltip
        amount={Math.max(Math.floor(amount / 2), 1)}
        {...tooltipProps}
      />,
      <BoneTooltip amount={Math.min(amount, 5)} {...tooltipProps} />
    ],
    {
      width: 250,
    }
  );

  return amount > 0 ? (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "50px",
        alignItems: "center",
      }}
    >
      <IPimg
        name={bone}
        size={30}
        onClick={onClick}
        title={Items.get_pretty_item_name(bone)}
        role={"button"}
        {...boneProps}
      />
      <span>{amount}</span>
      <BoneTooltips />
    </div>
  ) : null;
};

export default BoneDisplay;
