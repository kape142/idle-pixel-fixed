import FarmingPatch from "./FarmingPatch";
import SeedDisplay from "./SeedDisplay";
import { useFarmPatchesObserver } from "./useFarmPatchesObserver";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { hideElementById } from "../../util/domOperations";
import { SEEDS } from "./seeds";
import OverviewBox from "../OverviewBox";
import LabeledIPimg from "../../util/LabeledIPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { keysOf } from "../../util/typeUtils";
import { BONES } from "./bonemeal/bones";
import BoneDisplay from "./bonemeal/BoneDisplay";

const id = "FarmingOverview";
const FarmingOverview = () => {
  const seeds = Object.keys(SEEDS);
  const bones = keysOf(BONES);

  const [bonemeal, setBonemeal] = useNumberItemObserver("bonemeal", id);
  const [farmingXp] = useNumberItemObserver("farming_xp", id);

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
    patchData[nextPlot - 1].setSeed(seed);
    patchData[nextPlot - 1].setStage(1);
    patchData[nextPlot - 1].setTimer(SEEDS[seed].time * 60);
  };

  const plotClick = (index: number) => {
    const { stage, setStage, setSeed, death } = patchData[index];
    if (stage === 4 || death === 1) {
      if (finishedPatches === 1) {
        hideElementById("notification-farming");
      }
      sendMessage("CLICKS_PLOT", index + 1);
      setSeed("none");
      setStage(0);
    }
  };

  return (
    <OverviewBox height={"auto"} width={550} justifyContent={"space-between"}>
      <div style={{ display: "flex" }}>
        <LabeledIPimg
          name={"bonemeal_bin"}
          label={bonemeal}
          size={50}
          style={{ justifyContent: "center" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            width: "100px",
          }}
        >
          {bones.map((bone) => (
            <BoneDisplay
              bone={bone}
              bonemealValue={BONES[bone].bonemeal}
              bonemeal={bonemeal}
              setBonemeal={setBonemeal}
              key={bone}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            minHeight: "120px",
            width: "400px",
          }}
        >
          {seeds.map((seed) => (
            <SeedDisplay
              seed={seed}
              seedClick={() => seedClick(seed)}
              nextPlot={nextPlot}
              bonemeal={bonemeal}
              {...SEEDS[seed]}
              setBonemeal={setBonemeal}
              farmingLevel={get_level(farmingXp)}
              key={seed}
            />
          ))}
        </div>
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
              {...patchData[i]}
              plotClick={() => plotClick(i)}
              key={i + 1}
            />
          ))}
      </div>
    </OverviewBox>
  );
};

export default FarmingOverview;
