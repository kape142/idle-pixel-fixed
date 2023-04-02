import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import React from "react";

interface Props {
  machine: string;
  changeOilOut: (change: number) => void;
  level: number;
  items: string[];
  miningLevel: number;
}

const MachineDisplay = ({
  machine,
  changeOilOut,
  level,
  items,
  miningLevel,
}: Props) => {
  const oilUse = Ores.getOilCost(machine);

  const [machineProps, MachineTooltip] = useTooltip(
    [
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <span>{Items.get_pretty_item_name(machine)}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "10px",
          }}
        >
          {items.map((item) => (
            <IPimg name={item} size={30} />
          ))}
        </div>
      </div>,
    ],
    {
      width: 230,
    }
  );

  const [amount] = useNumberItemObserver(machine, "MachineDisplay");
  const [amountOn, setAmountOn] = useNumberItemObserver(
    `${machine}_on`,
    "MachineDisplay"
  );

  const onIncrease = () => {
    if (miningLevel >= level && amountOn < amount) {
      sendMessage("MACHINERY", machine, "increase");
      setAmountOn(amountOn + 1);
      changeOilOut(oilUse);
    }
  };

  const onDecrease = () => {
    if (amountOn > 0) {
      sendMessage("MACHINERY", machine, "decrease");
      setAmountOn(amountOn - 1);
      changeOilOut(-oilUse);
    }
  };

  return amount > 0 ? (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <IPimg
        name={machine}
        size={50}
        className={amountOn > 0 ? "shake" : ""}
        {...machineProps}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <IPimg name={"oil"} size={20} />
          <span>{`${oilUse * amountOn} (${oilUse})`}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            width: "max-content",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              role="button"
              style={{
                fontWeight: "500",
                userSelect: "none",
                visibility: amountOn > 0 ? "visible" : "hidden",
              }}
              onClick={onDecrease}
            >
              {"<"}
            </span>
            <span
              style={{ margin: "0 10px" }}
            >{`${amountOn} / ${amount}`}</span>
            <span
              role="button"
              style={{
                fontWeight: "500",
                userSelect: "none",
                visibility:
                  miningLevel >= level && amountOn < amount
                    ? "visible"
                    : "hidden",
              }}
              onClick={onIncrease}
            >
              {">"}
            </span>
          </div>
        </div>
      </div>
      <MachineTooltip />
    </div>
  ) : null;
};

export default MachineDisplay;
