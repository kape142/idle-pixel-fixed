import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import WoodcuttingPatch from "./WoodcuttingPatch";
import { useTreePatchesObserver } from "./useTreePatchesObserver";
import { hideElementById } from "../../util/domOperations";
import OverviewBox from "../OverviewBox";
import { keysOf } from "../../util/typeUtils";
import LogDisplay from "./LogDisplay";

const id = "WoodcuttingOverview";
const WoodcuttingOverview = () => {
  const patches =
    3 + Math.sign(Number(Items.getItem("donor_tree_patches_timestamp"))) * 2;

  const logs: string[] = keysOf(Cooking.LOG_HEAT_MAP);
  const patchData = useTreePatchesObserver(id);

  const finishedPatches = patchData.reduce(
    (acc, cur) => acc + (cur.stage === 4 ? 1 : 0),
    0
  );

  const plotClick = (index: number) => {
    const { stage, setType, setStage } = patchData[index];
    if (stage === 4) {
      if (finishedPatches === 1) {
        hideElementById("notification-woodcutting");
      }
      Woodcutting.clicksPlot(index + 1);
      setType("none");
      setStage(0);
    }
  };

  const [heat] = useNumberItemObserver("heat", id);

  return (
    <OverviewBox height={250} width={550} justifyContent={"space-between"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
            gap: "10px",
            width: "50px",
            alignItems: "center",
          }}
        >
          <IPimg
            name={"heat"}
            size={20}
            title={Items.get_pretty_item_name("heat")}
          />
          <span>{heat}</span>
        </div>

        {logs.map((log) => (
          <LogDisplay log={log} key={log} />
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
            <WoodcuttingPatch
              {...patchData[i]}
              plotClick={() => plotClick(i)}
              key={i + 1}
            />
          ))}
      </div>
    </OverviewBox>
  );
};

export default WoodcuttingOverview;
