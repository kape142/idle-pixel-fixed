import React from "react";
import LabeledIPimg from "../../util/LabeledIPimg";

interface Props {
  text: string;
  postText: string;
  log: string;
  amount: number;
  logHeat: number;
}

const LogTooltip = ({ text, postText, log, amount, logHeat }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div>
        {text} {amount} {Items.get_pretty_item_name(log)}
      </div>
      <div>
        {postText}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <LabeledIPimg
          name={"heat"}
          size={20}
          label={logHeat * amount}
        />
      </div>
    </div>
  );
};

export default LogTooltip;
