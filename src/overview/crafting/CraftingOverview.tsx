import IPimg from "../../util/IPimg";
import OreDisplay from "./OreDisplay";
import {
  useItemObserver,
  useNumberItemObserver,
} from "../setItems/useSetItemsObserver";
import BarDisplay from "./BarDisplay";
import OverviewBox from "../OverviewBox";
import { formatNumber } from "../../util/numberUtils";

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
  const [oil, setOil] = useNumberItemObserver("oil", id);
  const [charcoal, setCharcoal] = useNumberItemObserver("charcoal", id);
  const [lava, setLava] = useNumberItemObserver("lava", id);

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
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            width: "100px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IPimg name={"oil"} size={30} />
          <span>{formatNumber(oil)}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
            width: "150px",
          }}
        >

          <IPimg name={furnace} size={50} ext={oreType !== "none" ? "gif" : "png"} />

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
            width: "100px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              width: "50px",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IPimg name={"charcoal"} size={30} />
            <span>{charcoal}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              width: "50px",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IPimg name={"lava"} size={30} />
            <span>{lava}</span>
          </div>
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
            setOil={setOil}
            charcoal={charcoal}
            setCharcoal={setCharcoal}
            lava={lava}
            setLava={setLava}
            key={ore}
          />
        ))}
      </div>
    </OverviewBox>
  );
};

export default CraftingOverview;
