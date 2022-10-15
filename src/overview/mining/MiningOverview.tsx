import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import MachineDisplay from "./MachineDisplay";
import { MACHINES } from "./machines";
import OverviewBox from "../OverviewBox";

const id = "MiningOverview";
const MiningOverview = () => {
  const dispatch = useIPFDispatch();

  const [oilIn] = useNumberItemObserver("oil_in", id);
  const [oilOut, setOilOut] = useNumberItemObserver("oil_out", id);

  const [miningXp] = useNumberItemObserver("mining_xp", id);
  const miningLevel = get_level(miningXp);

  const changeOilOut = (change: number) => setOilOut(oilOut + change);

  return (
    <OverviewBox height={250} width={400} >
      <IPimg name={"oil"} size={50} style={{}} />
      <span>{`+${oilIn} / -${oilOut}`}</span>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {Object.keys(MACHINES).map((machine) => (
          <MachineDisplay
            machine={machine}
            changeOilOut={changeOilOut}
            reqLevel={MACHINES[machine].level}
            miningLevel={miningLevel}
            key={machine}
          />
        ))}
      </div>
    </OverviewBox>
  );
};

export default MiningOverview;
