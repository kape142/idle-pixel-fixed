import React from "react";

interface Props {
  area: string;
  amount: number;
}

const GatheringBagTooltip = ({ area, amount }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        Open {amount} {Items.get_pretty_item_name(area)} Bags
      </div>
    </div>
  );
};

export default GatheringBagTooltip;
