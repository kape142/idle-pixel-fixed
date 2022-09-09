import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import BrewingOverview from "./BrewingOverview";
import {LootItem} from "../../activitylog/types";
import {reduceToRecord} from "../../util/arrayUtils";

interface Props {
  potionName: string;
}

interface Ingredient {item: string, amount: number}

const PotionDisplay = ({ potionName }: Props) => {
  const amount = Items.getItem(potionName);
  const ingredients = Brewing.get_ingredients(potionName)


  const makeable = reduceToRecord<Ingredient>(ingredients, [
    value => ({item: value}),
    value => ({amount: Number(value)}),
  ]).reduce((acc, cur) => Math.min(Math.floor(Items.getItem(cur.item) / cur.amount), acc), Number.MAX_SAFE_INTEGER)

  return (amount || makeable) ? (
    <div
      style={{
        width: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IPimg name={potionName} size={30} title={Items.get_pretty_item_name(potionName)}/>
      <span>{amount} ({makeable})</span>
    </div>
  ) : null;
};

export default PotionDisplay;
