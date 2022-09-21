import { CookContent } from "../types";
import { formatDate, timeSince } from "../../util/timeUtils";

interface Props {
  content: CookContent;
  timestamp: Date;
}

const CookEntry = ({ content, timestamp }: Props) => {
  return (
    <div
      style={{
        borderBottom: "1px solid grey",
        margin: "10px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            width: "50px",
            visibility: "hidden",
          }}
        >
          padding
        </div>
        <div>Cooking</div>
        <div
          title={formatDate(timestamp)}
          style={{
            width: "50px",
            color: "gray",
          }}
        >
          {timeSince(timestamp)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
          }}
          src={get_image(`images/${Cooking.getOven()}.png`)}
          alt={`${Cooking.getOven()}-image`}
        />
        <div>
          <img
            style={{
              width: "30px",
              height: "30px",
            }}
            src={get_image(`images/${content.name}.png`)}
            alt={`${content.name}-image`}
          />
          {content.cooked} Cooked.
          <span className={"color-grey"}>({content.cookedXp} xp)</span>
        </div>
        <div>
          <img
            style={{
              width: "30px",
              height: "30px",
            }}
            src={get_image(
              `images/${content.name.replace("cooked", "raw")}.png`
            )}
            alt={`${content.name.replace("cooked", "raw")}-image`}
            className={"grayscale"}
          />
          {content.burnt} Burnt.
          <span className={"color-grey"}>({content.burntXp} xp)</span>
        </div>
      </div>
    </div>
  );
};

export default CookEntry;
