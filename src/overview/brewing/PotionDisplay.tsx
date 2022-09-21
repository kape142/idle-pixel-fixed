import IPimg from "../../util/IPimg";
import { reduceToRecord } from "../../util/arrayUtils";
import { BrewingView } from "./BrewingOverview";
import { sendMessage } from "../../util/websocket/useWebsocket";
import React, { MouseEvent } from "react";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { updateTimer } from "../../util/domOperations";

interface Ingredient {
  item: string;
  amount: number;
}

interface Props {
  potionName: string;
  toggle: () => void;
  view: BrewingView;
  opacity: number;
}

const PotionDisplay = ({ potionName, toggle, view, opacity }: Props) => {
  const [amount, setAmount] = useNumberItemObserver(
    potionName,
    "PotionDisplay"
  );
  const [timer, setTimer] = useNumberItemObserver(
    `${potionName}_timer`,
    "PotionDisplay"
  );

  const hasPotionStacker = Math.sign(
    Number(Items.getItem("donor_potion_stacker_timestamp"))
  );

  const potionTimer = Brewing.get_potion_timer(potionName);
  const ingredients = Brewing.get_ingredients(potionName);

  const getMakeable = () =>
    reduceToRecord<Ingredient>(ingredients, [
      (value) => ({ item: value }),
      (value) => ({ amount: Number(value) }),
    ]).reduce(
      (acc, cur) =>
        Math.min(Math.floor(Number(Items.getItem(cur.item)) / cur.amount), acc),
      Number.MAX_SAFE_INTEGER
    );

  const onDrinkClick = () => {
    if (amount > 0 && timer <= potionTimer * hasPotionStacker) {
      setAmount(amount - 1);
      setTimer( timer + potionTimer);
      updateTimer(`potion-${potionName}_timer`, timer + potionTimer);
      sendMessage("DRINK", potionName);
    }
  };

  const onBrewClick = (event: MouseEvent) => {
    const makeable = getMakeable();
    let making = 1;
    if (makeable > 0) {
      if (event.shiftKey) {
        making = makeable;
      } else if (event.ctrlKey) {
        making = Math.min(5, makeable);
      }
      setAmount(amount + making);
      sendMessage("BREW", potionName, making);
    }
  };

  const onClick =
    view === BrewingView.DRINK
      ? onDrinkClick
      : view === BrewingView.BREW
      ? onBrewClick
      : toggle;

  return (
    <div
      style={{
        width: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70px",
        opacity,
      }}
    >
      <IPimg
        role="button"
        name={"stardust"}
        onClick={toggle}
        style={{
          visibility: view === BrewingView.FAVORITE ? "visible" : "hidden",
        }}
        size={20}
      />
      <IPimg
        name={potionName}
        size={30}
        title={
          view === BrewingView.BREW
            ? `Max ${getMakeable()}`
            : Items.get_pretty_item_name(potionName)
        }
        onClick={onClick}
        role={"button"}
        style={
          (view === BrewingView.BREW && getMakeable() === 0) ||
          (view === BrewingView.DRINK && amount <= 0)
            ? {
                opacity: 0.5,
                cursor: "default",
              }
            : undefined
        }
      />
      <span
        style={{
          height: "20px",
        }}
      >
        {amount}
      </span>
      {view === BrewingView.BREW && (
        <span
          style={{
            fontSize: "25px",
            fontWeight: "500",
            position: "absolute",
            margin: "0 0 40px 25px",
            height: "30px",
          }}
        >
          +
        </span>
      )}
    </div>
  );
};

export default PotionDisplay;
