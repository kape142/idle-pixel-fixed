import IPimg from "../../util/IPimg";
import { useItemObserver, useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { useTooltip } from "../../util/tooltip/useTooltip";
import RocketTooltip from "./RocketTooltip";
import LabeledIPimg from "../../util/LabeledIPimg";

interface Props { }

const id = "RocketDisplay";
const RocketDisplay = ({ }: Props) => {
  const [rocket] = useNumberItemObserver("rocket", id);
  const [rocketStatus] = useItemObserver("rocket_status", id);
  const [rocketKm] = useNumberItemObserver("rocket_km", id);
  const [rocketDistanceRequired] = useNumberItemObserver("rocket_distance_required", id);
  const [rocketFuel] = useNumberItemObserver("rocket_fuel", id);

  const onRocketClick = (event: MouseEvent) => {
    Modals.clicks_rocket();
  };

  const [rocketProps, RocketToolTip, hideTooltip] = useTooltip(
    [
      <RocketTooltip
        fuel={rocketFuel}
      />,
    ]
  );

  return rocket > 0 ? (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <IPimg
        name={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "rocket" : "rocket_idle"}
        ext={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "gif" : "png"}
        size={30}
        onClick={onRocketClick}
        className={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "shake" : ""}
        role={"button"}
        {...rocketProps}
      />
      <span>{(rocketStatus && rocketStatus === "none") ? "Idle" : Items.get_pretty_item_name(rocketStatus)}</span>
      <RocketToolTip />
    </div>
  ) : null;
};

export default RocketDisplay;
