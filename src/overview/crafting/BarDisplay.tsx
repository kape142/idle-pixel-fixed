import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";

interface Props {
  bar: string;
}

const BarDisplay = ({ bar }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(bar, "BarDisplay");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "50px",
        alignItems: "center",
      }}
    >
      <IPimg name={bar} size={30} />
      <span>{amount}</span>
    </div>
  );
};

export default BarDisplay;
