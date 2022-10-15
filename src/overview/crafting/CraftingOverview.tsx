import { useIPFDispatch } from "../../redux/hooks";
import IPimg from "../../util/IPimg";
import OreDisplay from "./OreDisplay";
import {
  useItemObserver,
  useNumberItemObserver,
} from "../setItems/useSetItemsObserver";
import BarDisplay from "./BarDisplay";
import OverviewBox from "../OverviewBox";

const ORES = ["copper", "iron", "silver", "gold", "promethium", "titanium"];
const BARS = [
  "bronze_bar",
  "iron_bar",
  "silver_bar",
  "gold_bar",
  "promethium_bar",
  "titanium_bar",
];

const oreToBar = (ore: string) =>
  ore === "copper" ? "bronze_bar" : `${ore}_bar`;

export interface Smelting {
  type: string;
  amountAt: number;
  amountSet: number;
}

const id = "CraftingOverview";
const CraftingOverview = () => {
  const furnace = Furnace.getFurnace();
  const [oreType, setOreType] = useItemObserver("furnace_ore_type", id);
  const [oreAmountAt, setOreAmountAt] = useNumberItemObserver(
    "furnace_ore_amount_at",
    id
  );
  const [oreAmountSet, setOreAmountSet] = useNumberItemObserver(
    "furnace_ore_amount_set",
    id
  );
  const [oil] = useNumberItemObserver("oil", id);
  const [charcoal, setCharcoal] = useNumberItemObserver("charcoal", id);

  const setSmelting = (smelting: Smelting) => {
    setOreType(smelting.type);
    setOreAmountAt(smelting.amountAt);
    setOreAmountSet(smelting.amountSet);
  };

  return (
    <OverviewBox height={250} width={400}>
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
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div style={{ visibility: "hidden" }}>padding</div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
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
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <IPimg name={"charcoal"} size={30} />
          <span>{charcoal}</span>
        </div>
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
            oil={oil}
            key={ore}
          />
        ))}
      </div>
    </OverviewBox>
  );
};

export default CraftingOverview;
