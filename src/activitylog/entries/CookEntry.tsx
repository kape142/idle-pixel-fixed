import { CookContent } from "../types";
import { formatDate, timeSince } from "../../util/timeUtils";
import IPimg from "../../util/IPimg";

interface Props {
  content: CookContent;
  timestamp: Date;
}

const CookEntry = ({ content, timestamp }: Props) => {
  return (
    <div
      style={{
        borderBottom: "1px solid grey",
        margin: "1em",
        padding: "1em",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          fontSize: "1.6em",
        }}
      >
        <div
          style={{
            width: "5em",
            visibility: "hidden",
          }}
        >
          padding
        </div>
        <div>Cooking</div>
        <div
          title={formatDate(timestamp)}
          style={{
            width: "5em",
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
          fontSize: "1.6em",
        }}
      >
        <IPimg name={Cooking.getOven()} size={50} />
        <div>
          <IPimg name={content.name} size={30} />
          {content.cooked} Cooked.
          <span className={"color-grey"}>({content.cookedXp} xp)</span>
        </div>
        <div>
          <IPimg
            name={content.name.replace("cooked", "raw")}
            size={30}
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
