import { LootContent } from "../types";
import { formatDate, timeSince } from "../../util/timeUtils";

interface Props {
  content: LootContent;
  timestamp: Date;
}

const LootEntry = ({ content, timestamp }: Props) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #fff",
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
            visibility: "hidden",
            width: "5em",
          }}
        >
          padding
        </div>
        <div>Loot</div>
        <div
          title={formatDate(timestamp)}
          style={{
            width: "5em",
          }}
        >
          {timeSince(timestamp)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {content.items.map((item) => (
          <div
            style={{
              backgroundColor: item.background,
              border: "1px solid black",
              padding: "1em 2em",
              minWidth: "15me",
              margin: "1em",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                width: "5em",
                height: "5em",
                marginRight: "1.6em",
              }}
              src={get_image(item.image)}
              alt={`${item.label}-image`}
            />
            <span
              style={{
                fontSize: "1.6em",
                color: "#000",
                textShadow: "none",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LootEntry;
