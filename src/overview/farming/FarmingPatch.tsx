import IPimg from "../../util/IPimg";
import { useTooltip } from "../../util/tooltip/useTooltip";
import React from "react";

interface Props {
  seed: string;
  stage: number;
  timer: number;
  shiny: number;
  death: number;
  plotClick: () => void;
}

const getDeathImage = (seed: string) =>
  seed.includes("leaf")
    ? "farming_dead_leaf"
    : seed.includes("tree")
    ? "farming_dead_tree"
    : "farming_dead_mushroom";

const FarmingPatch = ({
  seed,
  stage,
  timer,
  shiny,
  death,
  plotClick,
}: Props) => {
  const [patchProps, PatchTooltip, hideTooltip] = useTooltip(
    <span>
      {shiny ? "Shiny " : ""}
      {death ? "Dead " : ""}
      {Items.get_pretty_item_name(seed)}
    </span>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${get_image("images/background_grass.png")}`,
        borderRadius: "20px",
        height: "120px",
        width: "100px",
        cursor: stage === 4 ? "pointer" : "default",
      }}
      onClick={() => {
        plotClick();
        hideTooltip();
      }}
    >
      {!["none", "0"].includes(seed) ? (
        <>
          <div style={{ height: "100px", width: "100px" }}>
            {shiny ? (
              <img
                src={get_image(`images/shiny.gif`)}
                alt={"shiny"}
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  height: "100px",
                  width: "100px",
                }}
              />
            ) : null}
            <IPimg
              name={death ? getDeathImage(seed) : `farming_${seed}_${stage}`}
              size={100}
              style={{ zIndex: 1, position: "absolute", objectFit: "unset" }}
              {...patchProps}
            />
            <IPimg
              name={`farming_none`}
              size={100}
              style={{ position: "absolute", objectFit: "unset" }}
            />
          </div>
          <span
            style={{
              color: "white",
            }}
          >
            {stage === 4 ? "READY" : timer > 0 ? format_time(timer) : ""}
          </span>
          <PatchTooltip />
        </>
      ) : null}
    </div>
  );
};

export default FarmingPatch;
