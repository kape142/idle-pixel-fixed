import React from "react";
import LabeledIPimg from "../../util/LabeledIPimg";

interface Props {
  ore: string;
  amount: number;
  oilPerBar: number;
  charcoalPerBar: number;
  lavaPerBar: number;
}

const OreTooltip = ({
  ore,
  amount,
  oilPerBar,
  charcoalPerBar,
  lavaPerBar,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        Smelt {amount} {Items.get_pretty_item_name(ore)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {oilPerBar > 0 && (
          <LabeledIPimg name={"oil"} size={30} label={oilPerBar * amount} />
        )}
        {charcoalPerBar > 0 && (
          <LabeledIPimg
            name={"charcoal"}
            size={30}
            label={charcoalPerBar * amount}
          />
        )}
        {lavaPerBar > 0 && (
          <LabeledIPimg name={"lava"} size={30} label={lavaPerBar * amount} />
        )}
      </div>
    </div>
  );
};

export default OreTooltip;
