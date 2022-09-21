import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import MachineDisplay from "./MachineDisplay";
import { useState } from "react";

const MACHINES = ["drill", "crusher", "giant_drill"];

const MiningOverview = () => {
  const dispatch = useIPFDispatch();

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
          justifyContent: "space-evenly"
        }}
      >
        {MACHINES.map((machine) => (
          <MachineDisplay
            machine={machine}
            changeOilOut={changeOilOut}
            key={machine}
          />
        ))}
      </div>
    </div>
  );
};

export default MiningOverview;
