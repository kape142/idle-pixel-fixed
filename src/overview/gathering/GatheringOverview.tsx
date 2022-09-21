import { useItemObserver } from "../setItems/useSetItemsObserver";
import GatheringBagDisplay from "./GatheringBagDisplay";

const AREAS = {
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

  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        width: "300px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
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
    </div>
  );
};

export default GatheringOverview;
