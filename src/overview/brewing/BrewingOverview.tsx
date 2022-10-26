import PotionDisplay from "./PotionDisplay";
import { useLocalStorage } from "../../util/localstorage/useLocalStorage";
import { CSSProperties, useMemo, useState } from "react";
import { toggleInArray } from "../../util/array";
import IPimg from "../../util/IPimg";
import { POTIONS } from "./potions";
import { useTooltip } from "../../util/tooltip/useTooltip";
import OverviewBox from "../OverviewBox";
import { useNumberItemObserver } from "../setItems/useSetItemsObserver";
import { useBrewingIngredientsObserver } from "./useBrewingIngredientsObserver";
import {
  replaceWebSocketMessage,
  useWebsocket,
} from "../../util/websocket/useWebsocket";

interface Props {}

export enum BrewingView {
  DRINK = "DRINK",
  BREW = "BREW",
  FAVORITE = "FAVORITE",
}

const id = "BrewingOverview";
const BrewingOverview = ({}: Props) => {
  const [view, setView] = useState(BrewingView.DRINK);

  const potions = Object.keys(POTIONS);

  const brewingIngredients = useBrewingIngredientsObserver(id);

  const [favorites, setFavorites] = useLocalStorage(
    "brewing-favorites",
    potions.slice(0, 15),
    id
  );

  const [brewingXp] = useNumberItemObserver("brewing_xp", id);

  const toggle = (potionName: string) => () => {
    setFavorites((favs) => {
      favs = toggleInArray(favs, potionName);
      return potions.filter((potion) => favs.includes(potion));
    });
  };

  const viewSelectorStyle = (selectorView: BrewingView): CSSProperties => ({
    opacity: view === selectorView ? 0.3 : 1,
  });

  const blockPopup = useMemo(
    () =>
      replaceWebSocketMessage("OPEN_DIALOGUE", (data) => {
        if (data.split("~")[0] === "INGREDIENTS USED") {
          return "";
        }
        return data;
      }),
    []
  );

  useWebsocket(blockPopup, 1, id);

  const [drinkProps, DrinkToolTip] = useTooltip(<span>Drink potions</span>);
  const [brewProps, BrewToolTip] = useTooltip(<span>Brew potions</span>);
  const [viewProps, ViewToolTip] = useTooltip(<span>Hide/show potions</span>);

  return (
    <OverviewBox
      height={250}
      width={300}
      flexDirection={"row"}
      alignItems={"stretch"}
    >
      <div
        style={{
          display: "flex",
          width: `100%`,
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "30px",
            flexShrink: 0,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IPimg
            role="button"
            name={"brewing"}
            onClick={() => setView(BrewingView.DRINK)}
            size={30}
            style={viewSelectorStyle(BrewingView.DRINK)}
            {...drinkProps}
          />
          <IPimg
            role="button"
            name={"brewing_kit"}
            onClick={() => setView(BrewingView.BREW)}
            size={30}
            style={viewSelectorStyle(BrewingView.BREW)}
            {...brewProps}
          />
          <IPimg
            role="button"
            name={"view"}
            onClick={() => setView(BrewingView.FAVORITE)}
            size={30}
            style={viewSelectorStyle(BrewingView.FAVORITE)}
            {...viewProps}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            overflowY: "auto",
          }}
        >
          {(view === BrewingView.FAVORITE ? potions : favorites).map(
            (potion) => (
              <PotionDisplay
                brewingLevel={get_level(brewingXp)}
                key={potion}
                potionName={potion}
                toggle={toggle(potion)}
                view={view}
                favorite={favorites.includes(potion)}
                brewingIngredients={brewingIngredients}
              />
            )
          )}
        </div>
      </div>
      <DrinkToolTip />
      <BrewToolTip />
      <ViewToolTip />
    </OverviewBox>
  );
};

export default BrewingOverview;
