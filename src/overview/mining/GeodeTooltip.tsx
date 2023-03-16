import React from "react";

interface Props {
  geode: string;
  amount: number;
  postText?: string;
}

const GeodeTooltip = ({ geode, amount, postText }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "350px" }}>
      <div>
        Open {amount} {Items.get_pretty_item_name(geode)} Geode(s)
      </div>
      <div>
        {postText}
      </div>
    </div>
  );
};

export default GeodeTooltip;
