import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";

interface Props {
  log: string;
}

const id = "LogDisplay";
const LogDisplay = ({ log }: Props) => {
  const [amount] = useNumberItemObserver(log, id);


  return amount > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "50px",
        alignItems: "center",
      }}
    >
      <IPimg
        name={log}
        size={30}
        title={Items.get_pretty_item_name(log)}
      />
      <span>{amount}</span>
    </div>
  ) : null;
};

export default LogDisplay;
