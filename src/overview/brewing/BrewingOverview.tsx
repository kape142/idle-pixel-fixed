import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import PotionDisplay from "./PotionDisplay";

interface Props {}

const BrewingOverview = ({}: Props) => {
  const dispatch = useIPFDispatch();
  const potions = Object.keys(Brewing.POTION_TIMERS);

  return (
    <div style={{
      display: "flex"
    }}>
      {potions.map((potion) => (
        <PotionDisplay potionName={potion} />
      ))}
    </div>
  );
};

export default BrewingOverview;
