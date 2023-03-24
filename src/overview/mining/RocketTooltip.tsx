import React from "react";
import LabeledIPimg from "../../util/LabeledIPimg";

interface Props {
  fuel: number;
}

const RocketTooltip = ({ fuel }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
      <div>
        Start Rocket
      </div>
      <div>
        Available fuel
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <LabeledIPimg
          name={"rocket_fuel"}
          size={20}
          label={fuel}
        />
      </div>
    </div>
  );
};

export default RocketTooltip;
