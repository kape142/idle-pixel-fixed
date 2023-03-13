import IPimg from "../../util/IPimg";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { MouseEvent } from "react";

interface Props {
  geode: string;
}

const GeodeDisplay = ({ geode }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(geode + "_geode", "GeodeDisplay");

  const onGeodeClick = (event: MouseEvent) => {
    Modals.open_input_dialogue_with_value(geode + "_geode", "Open", "How many geodes to you want to crack?", amount, "CRACK_GEODE");
  };

  return (
    <>
      {amount > 0 &&
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "50px",
            alignItems: "center",
          }}
        >
          <IPimg
            name={geode + "_geode"}
            size={30}
            onClick={onGeodeClick}
            title={Items.get_pretty_item_name(geode + "_geode")}
            role={"button"}
          />
          <span>{amount}</span>
        </div>
      }
    </>
  );
};

export default GeodeDisplay;
