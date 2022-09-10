import { useIPFDispatch } from "../../redux/hooks";
import PotionDisplay from "./PotionDisplay";
import { useLocalStorage } from "../../util/localstorage/useLocalStorage";
import { useState } from "react";
import { toggleInArray } from "../../util/array";

interface Props {}

const BrewingOverview = ({}: Props) => {
  const dispatch = useIPFDispatch();
  const [edit, setEdit] = useState(false);

  const potions = Object.keys(Brewing.POTION_TIMERS);

  const [favorites, setFavorites] = useLocalStorage(
    "brewing-favorites",
    potions,
    "PotionDisplay"
  );

  const toggle = (potionName: string) => () => {
    setFavorites((favs) => toggleInArray(favs, potionName));
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <button onClick={() => setEdit((edit) => !edit)} type={"button"}>
        Edit
      </button>
      {(edit ? potions : favorites).map((potion) => (
        <div
          style={{
            opacity: favorites.includes(potion) ? 1 : 0.5,
          }}
        >
          <PotionDisplay
            potionName={potion}
            toggle={edit ? toggle(potion) : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default BrewingOverview;
