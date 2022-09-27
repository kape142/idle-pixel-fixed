import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { sendMessage } from "../../util/websocket/useWebsocket";

interface Props {
  machine: string;
  changeOilOut: (change: number) => void;
}

const MachineDisplay = ({ machine, changeOilOut }: Props) => {
  const dispatch = useIPFDispatch();

  const oilUse = Ores.getOilCost(machine);

  const [amount, setAmount] = useNumberItemObserver(machine, "MachineDisplay");
  const [amountOn, setAmountOn] = useNumberItemObserver(
    `${machine}_on`,
    "MachineDisplay"
  );

  const onIncrease = () => {
    if (amountOn < amount) {
      sendMessage("MACHINERY", machine, "increase");
      setAmountOn(amountOn + 1);
      changeOilOut(oilUse);
    }
  };

  const onDecrease = () => {
    if (amountOn > 0) {
      sendMessage("MACHINERY", machine, "decrease");
      setAmountOn(amountOn - 1);
      changeOilOut(-oilUse);
    }
  };

  return amount > 0 ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "min-content",
        alignItems: "center",
      }}
    >
      <IPimg name={machine} size={50} style={{}} />
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <IPimg name={"oil"} size={20} />
        <span>{`${oilUse * amountOn} (${oilUse})`}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          width: "max-content",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            role="button"
            style={{
              fontWeight: "500",
              fontSize: "24px",
              userSelect: "none",
              visibility: amountOn > 0 ? "visible" : "hidden",
            }}
            onClick={onDecrease}
          >
            {"<"}
          </span>
          <span style={{ margin: "0 10px" }}>{`${amountOn} / ${amount}`}</span>
          <span
            role="button"
            style={{
              fontWeight: "500",
              fontSize: "24px",
              userSelect: "none",
              visibility: amountOn < amount ? "visible" : "hidden",
            }}
            onClick={onIncrease}
          >
            {">"}
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default MachineDisplay;
