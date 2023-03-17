import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";
import { sendMessage } from "../../util/websocket/useWebsocket";
import { useTooltip } from "../../util/tooltip/useTooltip";
import LogTooltip from "./LogTooltip";
interface Props {
  log: string;
  logHeat: number;
}

const id = "LogDisplay";
const LogDisplay = ({ log, logHeat }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(log, id);

  const onLogClick = (event: MouseEvent) => {
    hideTooltip();
    if (event.shiftKey) {
      setAmount(0);
      sendMessage("ADD_HEAT", log, amount);
    } else if (event.ctrlKey) {
      let making = Math.floor(amount / 2);
      setAmount(amount - making);
      sendMessage("ADD_HEAT", log, making);
    } else {
      Modals.open_input_dialogue_with_value(log, "Add Heat", "<span class='font-large'>Add heat to your oven.</span><br /><br /><span class='color-grey'>Gain <img src='https://d1xsc8x7nc5q8t.cloudfront.net/images/heat.png' /> " + Cooking.getHeatPerLog(log) + " heat per log.</span><br /><br />", amount, "ADD_HEAT");
    }
  };

  const logTooltipProps = {
    log: log,
    logHeat: logHeat,
  };

  const [logProps, LogTooltips, hideTooltip] = useTooltip(
    [
      <LogTooltip
        text={"Use"}
        postText={"(with confirmation)"}
        amount={amount}
        {...logTooltipProps}
      />,
      <LogTooltip
        text={"Add"}
        postText={"(no confirmation)"}
        amount={amount}
        {...logTooltipProps}
      />,
      <LogTooltip
        text={"Add"}
        amount={Math.floor(amount / 2)}
        postText={"(no confirmation)"}
        {...logTooltipProps}
      />
    ],
    {
      width: 250,
    }
  );

  return amount > 0 ? (
    <div
      style={{
        position: "relative",
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
        role={"button"}
        {...logProps}
      />
      <span>{amount}</span>
      <LogTooltips />
    </div>
  ) : null;
};

export default LogDisplay;
