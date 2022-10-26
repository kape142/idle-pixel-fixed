import IPimg from "../../util/IPimg";
import { useTooltip } from "../../util/tooltip/useTooltip";
import React from "react";

interface Props {
  area: string;
  image: string;
  name: string;
  items: string;
  getUnlocked: () => boolean;
  isSelectedArea: boolean;
  selectArea: () => void;
}

const GatheringAreaDisplay = ({
  image,
  name,
  items,
  getUnlocked,
  isSelectedArea,
  selectArea,
}: Props) => {
  const [areaProps, AreaTooltip] = useTooltip(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "300px",
        fontSize: "16px",
      }}
    >
      <span>{Items.get_pretty_item_name(name)}</span>
      <span style={{ fontSize: "12px" }}>Items: {items}</span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "93px",
        height: "90px",
        justifyContent: "space-between",
        visibility: getUnlocked() ? "visible" : "hidden",
      }}
    >
      <IPimg
        name={`gathering_${image}`}
        size={50}
        style={{
          boxSizing: "content-box",
          border: `3px solid ${isSelectedArea ? "green" : "transparent"}`,
          padding: "2px",
          borderRadius: "5px",
        }}
        role={"button"}
        onClick={selectArea}
        {...areaProps}
      />
      <div
        style={{
          height: "25px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {name}
      </div>
      <AreaTooltip />
    </div>
  );
};

export default GatheringAreaDisplay;
