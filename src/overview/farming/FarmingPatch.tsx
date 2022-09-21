import IPimg from "../../util/IPimg";

interface Props {
  seed: string;
  stage: number;
  timer: number;
  plotClick: () => void;
}
const id = "FarmingPatch";
const FarmingPatch = ({ seed, stage, timer, plotClick }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${get_image("images/background_grass.png")}`,
        borderRadius: "20px",
        height: "120px",
        width: "100px",
      }}
    >
      {seed !== "none" ? (
        <>
          <div style={{ height: "100px", width: "100px" }}>
            <IPimg
              role="button"
              name={`farming_${seed}_${stage}`}
              onClick={plotClick}
              size={100}
              style={{ zIndex: 1, position: "absolute", objectFit: "unset" }}
            />
            <IPimg
              name={`farming_none`}
              size={100}
              style={{ position: "absolute", objectFit: "unset" }}
            />
          </div>
          <span
            style={{
              color: "white",
            }}
          >
            {stage === 4 ? "READY" : timer > 0 ? format_time(timer) : ""}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default FarmingPatch;
