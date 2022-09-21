import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import OreDisplay from "./OreDisplay";
import {
  useItemObserver,
  useNumberItemObserver,
} from "../setItems/useSetItemsObserver";
import BarDisplay from "./BarDisplay";

const ORES = ["copper", "iron", "silver", "gold", "promethium"];
const BARS = [
  "bronze_bar",
  "iron_bar",
  "silver_bar",
  "gold_bar",
  "promethium_bar",
];

const oreToBar = (ore: string) =>
  ore === "copper" ? "bronze_bar" : `${ore}_bar`;

export interface Smelting {
  type: string;
  amountAt: number;
  amountSet: number;
}

const CraftingOverview = () => {
  const dispatch = useIPFDispatch();

  const furnace = Furnace.getFurnace();
  const [oreType, setOreType] = useItemObserver(
    "furnace_ore_type",
    "CraftingOverview"
  );
  const [oreAmountAt, setOreAmountAt] = useNumberItemObserver(
    "furnace_ore_amount_at",
    "CraftingOverview"
  );
  const [oreAmountSet, setOreAmountSet] = useNumberItemObserver(
    "furnace_ore_amount_set",
    "CraftingOverview"
  );

  const setSmelting = (smelting: Smelting) => {
    setOreType(smelting.type);
    setOreAmountAt(smelting.amountAt);
    setOreAmountSet(smelting.amountSet);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        width: "300px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {BARS.map((bar) => (
          <BarDisplay bar={bar} key={bar} />
        ))}
      </div>
      <IPimg name={furnace} size={50} />
      <div
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        {oreType !== "none" ? (
          <>
            <IPimg name={oreToBar(oreType)} size={20} style={{}} />
            <span>{`${oreAmountAt}/${oreAmountSet}`}</span>
          </>
        ) : (
          <span>Not smelting</span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        {ORES.map((ore) => (
          <OreDisplay
            ore={ore}
            disabled={oreType !== "none"}
            setSmelting={setSmelting}
            key={ore}
          />
        ))}
      </div>
    </div>
  );
};

export default CraftingOverview;
