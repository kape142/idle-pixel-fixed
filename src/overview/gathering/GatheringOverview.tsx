import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { useState } from "react";

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
    image: "gem_mine"
  }
};

const GatheringOverview = () => {
  const dispatch = useIPFDispatch();
  const areas = Object.keys(AREAS)

  const [oilIn, setOilIn] = useNumberItemObserver("oil_in", "MiningOverview");
  const [oilOut, setOilOut] = useState(Items.getItem("oil_out"));

  const changeOilOut = (change: number) =>
    setOilOut((oilOut) => oilOut + change);

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
      <IPimg name={"oil"} size={50} style={{}} />
      <span>{`+${oilIn} / -${oilOut}`}</span>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
      </div>
    </div>
  );
};

export default GatheringOverview;
