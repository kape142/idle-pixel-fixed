import { LootContent } from "../types";

interface Props {
  content: LootContent;
}

const LootEntry = ({ content }: Props) => {
  return (
    <div
      style={{
        borderBottom: "1px solid grey",
        margin: "10px",
        padding: "10px",
      }}
    >
      Loot
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
