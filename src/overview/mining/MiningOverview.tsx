import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { useTooltip } from "../../util/tooltip/useTooltip";
import MachineDisplay from "./MachineDisplay";
import PrismDisplay from "./PrismDisplay";
import GeodeDisplay from "./GeodeDisplay";
import MineralDisplay from "./MineralDisplay";
import { MACHINES } from "./machines";
import OverviewBox from "../OverviewBox";
import { keysOf } from "../../util/typeUtils";
import LabeledIPimg from "../../util/LabeledIPimg";
import RocketDisplay from "./RocketDisplay";

const STARDUST_PRISMS = ["small", "medium", "large", "huge"];
const GEODES = ["grey", "blue", "green", "red", "cyan", "ancient"];
const MINERALS: string[] = keysOf(Ores.MINERALS_XP_MAP);

const id = "MiningOverview";
const MiningOverview = () => {
  const [oilIn] = useNumberItemObserver("oil_in", id);
  const [oilOut, setOilOut] = useNumberItemObserver("oil_out", id);

  const [miningXp] = useNumberItemObserver("mining_xp", id);
  const miningLevel = get_level(miningXp);

  const changeOilOut = (change: number) => setOilOut(oilOut + change);

  const [moonstone] = useNumberItemObserver("moonstone", id);

  const onMoonstoneClick = () => {
    Modals.open_custom_crafting("moonstone");
  };

  const [moonstoneProps, MoonstoneToolTip] = useTooltip([
    <span style={{ textAlign: "center" }}>Use {moonstone} Moonstone(s)</span>,
  ]);

  return (
    <OverviewBox height={"auto"} width={420}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <LabeledIPimg
          name={"oil"}
          label={`${oilIn > oilOut ? "+" : ""}${oilIn - oilOut}`}
          size={30}
          style={{
            justifyContent: "center",
            color: oilIn >= oilOut ? "#fff" : "#ff0000",
            filter:
              oilIn >= oilOut
                ? ""
                : "invert(16%) sepia(91%) saturate(5761%) hue-rotate(357deg) brightness(96%) contrast(116%)",
          }}
        />

        <RocketDisplay />
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(MACHINES).map((machine) => (
          <MachineDisplay
            machine={machine}
            changeOilOut={changeOilOut}
            {...MACHINES[machine]}
            miningLevel={miningLevel}
            key={machine}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {STARDUST_PRISMS.map((prism) => (
          <PrismDisplay prism={prism} />
        ))}
        {GEODES.map((geode) => (
          <GeodeDisplay geode={geode} />
        ))}
        {MINERALS.map((mineral) => (
          <MineralDisplay mineral={mineral} />
        ))}
        {moonstone > 0 && (
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "50px",
              alignItems: "center",
            }}
          >
            <IPimg
              name={"moonstone"}
              size={30}
              onClick={onMoonstoneClick}
              title={"Moonstone"}
              role={"button"}
              {...moonstoneProps}
            />
            <span>{moonstone}</span>
            <MoonstoneToolTip />
          </div>
        )}
      </div>
    </OverviewBox>
  );
};

export default MiningOverview;
