import IPimg from "../../util/IPimg";

interface Props {
  text: string;
  value: boolean;
  onClick: () => void;
}

const ActivityLogSetting = ({ text, value, onClick }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "20vw",
        border: "1px solid grey",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <span>{text}</span>
      <IPimg
        name={value ? "gold" : "stone"}
        onClick={() => {
          onClick();
        }}
      />
    </div>
  );
};

export default ActivityLogSetting;
