import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { useTooltip } from "../../util/tooltip/useTooltip";
import React from "react";
import LabeledIPimg from "../../util/LabeledIPimg";
import { formatMinutes } from "../../util/timeUtils";

interface Props {
  seed: string;
  seedClick: () => void;
  nextPlot: number;
  farmingLevel: number;
  level: number;
  stopsDying: number;
  bonemeal: number;
  bonemealCost: number;
  setBonemeal: (bonemeal: number) => void;
  time: number;
}

const id = "SeedDisplay";
const SeedDisplay = ({
  seed,
  seedClick,
  nextPlot,
  farmingLevel,
  level,
  stopsDying,
  bonemeal,
  bonemealCost,
  setBonemeal,
  time,
}: Props) => {
  const [amount, setAmount] = useNumberItemObserver(seed, id);

  const canPlant =
    nextPlot > 0 &&
    amount > 0 &&
    bonemeal >= bonemealCost &&
    farmingLevel >= level;

  const onClick = () => {
    if (canPlant) {
      seedClick();
      if (amount === 1) {
        hideTooltip();
      }
      setAmount(amount - 1);
      setBonemeal(bonemeal - bonemealCost);
    }
  };

  const [seedProps, SeedTooltip, hideTooltip] = useTooltip(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
        alignItems: "center",
      }}
    >
      <span>
        {canPlant ? "Plant" : "Can't Plant"} {Items.get_pretty_item_name(seed)}
      </span>
      <span>Time: {formatMinutes(time)}</span>
      <span>
        Level:{" "}
        <span style={{ color: farmingLevel < level ? "red" : "unset" }}>
          {level}
        </span>
      </span>
      {stopsDying > 0 && (
        <span>
          Stops Dying:{" "}
          <span
            style={{ color: farmingLevel < stopsDying ? "yellow" : "unset" }}
          >
            {stopsDying}
          </span>
        </span>
      )}
      {bonemealCost > 0 && (
        <LabeledIPimg
          size={30}
          name={"bonemeal"}
          label={bonemealCost}
          style={{ color: bonemeal < bonemealCost ? "red" : "unset" }}
        />
      )}
    </div>
  );

  return amount > 0 ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "50px",
          alignItems: "center",
          opacity: canPlant ? 1 : 0.5,
        }}
      >
        <IPimg
          name={seed}
          size={30}
          onClick={onClick}
          role={"button"}
          style={{
            cursor: canPlant ? "pointer" : "default",
          }}
          {...seedProps}
        />
        <span>{amount}</span>
      </div>
      {nextPlot > 0 && <SeedTooltip />}
    </>
  ) : null;
};

export default SeedDisplay;
