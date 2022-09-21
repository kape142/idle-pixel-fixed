import IPimg from "../../util/IPimg";

interface Props {
  type: string;
  stage: number;
  timer: number;
  plotClick: () => void;
}

const id = "WoodcuttingPatch";
const WoodcuttingPatch = ({ type, stage, timer, plotClick }: Props) => {

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
      {type !== "none" ? (
        <>
          <IPimg
            role="button"
            name={`woodcutting_${type}_${stage}`}
            onClick={plotClick}
            size={100}
            style={{}}
          />
          <span
            style={{
              color: "white",
            }}
          >
            {stage === 4 ? "READY" : format_time(timer)}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default WoodcuttingPatch;
