import { useIPFDispatch } from "../../redux/hooks";
import FarmingPatch from "./FarmingPatch";
import SeedDisplay from "./SeedDisplay";
import { useFarmPatchesObserver } from "./useFarmPatchesObserver";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { hideElementById } from "../../util/domOperations";
import { SEEDS } from "./seeds";

const id = "FarmingOverview";
const FarmingOverview = () => {
  const dispatch = useIPFDispatch();

  const seeds = Object.keys(SEEDS);

  const patches =
    3 + Math.sign(Number(Items.getItem("donor_farm_patches_timestamp"))) * 2;

  const patchData = useFarmPatchesObserver(id);

  const nextPlot =
    patchData
      .map((patch) => patch.stage)
      .findIndex((value, index) => value === 0 && index < patches) + 1;

  const finishedPatches = patchData.reduce(
    (acc, cur) => acc + (cur.stage === 4 ? 1 : 0),
    0
  );

  const seedClick = (seed: string) => {
    sendMessage("PLANT", seed, nextPlot);
    console.log("planting in", nextPlot);
    patchData[nextPlot - 1].setSeed(seed);
    patchData[nextPlot - 1].setStage(1);
    patchData[nextPlot - 1].setTimer(SEEDS[seed].time * 60);
  };

  const plotClick = (index: number) => {
    const { stage, setStage, setSeed } = patchData[index];
    if (stage === 4) {
      console.log(finishedPatches);
      if (finishedPatches === 1) {
        hideElementById("notification-farming");
      }
      sendMessage("CLICKS_PLOT", index + 1);
      setSeed("none");
      setStage(0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        gap: "5px",
        border: "1px solid black",
        width: "550px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {seeds.map((seed) => (
          <SeedDisplay
            seed={seed}
            seedClick={() => seedClick(seed)}
            nextPlot={nextPlot}
            key={seed}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {Array(patches)
          .fill(null)
          .map((v, i) => (
            <FarmingPatch
              seed={patchData[i].seed}
              stage={patchData[i].stage}
              timer={patchData[i].timer}
              plotClick={() => plotClick(i)}
              key={i + 1}
            />
          ))}
      </div>
    </div>
  );
};

export default FarmingOverview;
