import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";

interface Props {
  log: string;
}

const id = "LogDisplay";
const LogDisplay = ({ log }: Props) => {
  const [amount] = useNumberItemObserver(log, id);

  const onLogClick = (event: MouseEvent) => {
    Modals.open_input_dialogue_with_value(log, "Add Heat", "<span class='font-large'>Add heat to your oven.</span><br /><br /><span class='color-grey'>Gain <img src='https://d1xsc8x7nc5q8t.cloudfront.net/images/heat.png' /> " + Cooking.getHeatPerLog(log) +" heat per log.</span><br /><br />", amount, "ADD_HEAT");
  };

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
        onClick={onLogClick}
        title={Items.get_pretty_item_name(log)}
        role={"button"}
      />
      <span>{amount}</span>
    </div>
  ) : null;
};

export default LogDisplay;
