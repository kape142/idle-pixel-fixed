import IPimg from "../../util/IPimg";
import { reduceToRecord } from "../../util/arrayUtils";

interface Props {
  potionName: string;
  toggle?: () => void;
}

interface Ingredient {
  item: string;
  amount: number;
}

const PotionDisplay = ({ potionName, toggle }: Props) => {
  const amount = Items.getItem(potionName);

  const ingredients = Brewing.get_ingredients(potionName);
  const makeable = reduceToRecord<Ingredient>(ingredients, [
    (value) => ({ item: value }),
    (value) => ({ amount: Number(value) }),
  ]).reduce(
    (acc, cur) =>
      Math.min(Math.floor(Items.getItem(cur.item) / cur.amount), acc),
    Number.MAX_SAFE_INTEGER
  );

  return (
    <div
      style={{
        width: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {toggle && <IPimg role="button" name={"stardust"} onClick={toggle} />}
      <IPimg
        name={potionName}
        size={30}
        title={Items.get_pretty_item_name(potionName)}
      />
      <span>{amount}</span>
      <button
        title={`max ${makeable}`}
        style={{
          fontSize: "25px",
          fontWeight: "900",
          borderRadius: "100px",
          width: "30px",
          display: "flex",
          alignContent: "center",
          backgroundColor: "unset",
          border: "unset",
        }}
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default PotionDisplay;
