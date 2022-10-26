import React from "react";
import LabeledIPimg from "../../../util/LabeledIPimg";

interface Props {
  bone: string;
  amount: number;
  bonemealValue: number;
}

const BoneTooltip = ({ bone, amount, bonemealValue }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: "250px", alignItems: "center" }}>
      <div>
        Add {amount} {Items.get_pretty_item_name(bone)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <LabeledIPimg
          name={"bonemeal"}
          size={30}
          label={bonemealValue * amount}
        />
      </div>
    </div>
  );
};

export default BoneTooltip;
