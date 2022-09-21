import { LootContent } from "../types";
import {formatDate, timeSince} from "../../util/timeUtils";

interface Props {
  content: LootContent;
  timestamp: Date;
}

const LootEntry = ({ content, timestamp }: Props) => {
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
            visibility: "hidden",
            width: "50px",
          }}
        >
          padding
        </div>
        <div>Loot</div>
        <div
          title={formatDate(timestamp)}
          style={{
            color: "gray",
            width: "50px",
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
              padding: "10px 20px",
              minWidth: "150px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                marginRight: "16px",
              }}
              src={get_image(item.image)}
              alt={`${item.label}-image`}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LootEntry;
