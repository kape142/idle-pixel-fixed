import { useItemObserver } from "../setItems/useSetItemsObserver";
import GatheringBagDisplay from "./GatheringBagDisplay";
import IPimg from "../../util/IPimg";
import { useState } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import OverviewBox from "../OverviewBox";

const AREAS: Record<string, { image: string }> = {
  mines: {
    image: "mine",
  },
  fields: {
    image: "field",
  },
  forest: {
    image: "forest",
  },
  fishing_pond: {
    image: "fishing_pond",
  },
  kitchen: {
    image: "kitchen",
  },
  gem_mine: {
    image: "gem_mine",
  },
};

const id = "GatheringOverview";
const GatheringOverview = () => {
  const areas = Object.keys(AREAS);

  const [currentGatheringArea, setCurrentGatheringArea] = useItemObserver(
    "current_gathering_area",
    id
  );

  const [updateTimeout, setUpdateTimeout] = useState(setTimeout(() => {}));

  const currentIndex = Object.keys(AREAS).indexOf(currentGatheringArea);
  const areaAmount = Object.keys(AREAS).length;

  const queueChange = (change: number) => {
    const nextIndex = currentIndex + change;
    if (nextIndex >= 0 && nextIndex <= areaAmount) {
      const nextArea = Object.keys(AREAS)[nextIndex];
      setCurrentGatheringArea(nextArea);
      clearTimeout(updateTimeout);
      setUpdateTimeout(
        setTimeout(() => {
          if (nextArea !== currentGatheringArea) {
            sendMessage("GATHERING", nextArea);
          }
        }, 1000)
      );
    }
  };

  return (

    <OverviewBox height={250} width={300} >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            visibility: currentIndex > 0 ? "visible" : "hidden",
            height: "100px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          role="button"
          onClick={() => queueChange(-1)}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "24px",
              userSelect: "none",
            }}
          >
            {"<"}
          </span>
        </div>
        <IPimg
          name={`gathering_${AREAS[currentGatheringArea].image}`}
          size={100}
        />
        <div
          style={{
            visibility: currentIndex < areaAmount - 1 ? "visible" : "hidden",
            height: "100px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          role="button"
          onClick={() => queueChange(1)}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "24px",
              userSelect: "none",
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <span>{Items.get_pretty_item_name(currentGatheringArea)}</span>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {areas.map((area) => (
          <GatheringBagDisplay area={area} key={area} />
        ))}
      </div>
    </OverviewBox>
  );
};

export default GatheringOverview;
