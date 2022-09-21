import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";

interface Props {
  seed: string;
  seedClick: () => void;
  nextPlot: number;
}

const id = "SeedDisplay";
const SeedDisplay = ({ seed, seedClick, nextPlot }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(seed, id);

  const onClick = () => {
    if (nextPlot > 0 && amount > 0) {
      seedClick();
      setAmount(amount - 1);
    }
  };

  return amount > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "50px",
        alignItems: "center",
        opacity: nextPlot > 0 ? 1 : 0.5,
        cursor: nextPlot > 0 ? "pointer" : "default",
      }}
      role={"button"}
    >
      <IPimg
        name={seed}
        size={30}
        onClick={onClick}
        title={Items.get_pretty_item_name(seed)}
      />
      <span>{amount}</span>
    </div>
  ) : null;
};

export default SeedDisplay;
