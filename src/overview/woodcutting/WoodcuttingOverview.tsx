import { useIPFDispatch } from "../../redux/hooks";
import WoodcuttingPatch from "./WoodcuttingPatch";
import { useTreePatchesObserver } from "./useTreePatchesObserver";
import { hideElementById } from "../../util/domOperations";

const id = "WoodcuttingOverview";
const WoodcuttingOverview = () => {
  const dispatch = useIPFDispatch();

  const patches =
    3 + Math.sign(Number(Items.getItem("donor_tree_patches_timestamp"))) * 2;

  const patchData = useTreePatchesObserver(id);

  const finishedPatches = patchData.reduce(
    (acc, cur) => acc + (cur.stage === 4 ? 1 : 0),
    0
  );

  const plotClick = (index: number) => {
    const { stage, setType, setStage } = patchData[index];
    if (stage === 4) {
      console.log(finishedPatches);
      if (finishedPatches === 1) {
        hideElementById("notification-woodcutting");
      }
      Woodcutting.clicksPlot(index + 1);
      setType("none");
      setStage(0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        gap: "10px",
        alignItems: "center",
        alignContent: "center",
        border: "1px solid black",
        width: "550px",
        justifyContent: "center",
      }}
    >
      {Array(patches)
        .fill(null)
        .map((v, i) => (
          <WoodcuttingPatch
            type={patchData[i].type}
            stage={patchData[i].stage}
            timer={patchData[i].timer}
            plotClick={() => plotClick(i)}
            key={i + 1}
          />
        ))}
    </div>
  );
};

export default WoodcuttingOverview;
