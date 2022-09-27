import { useIPFDispatch } from "../../redux/hooks";
import PotionDisplay from "./PotionDisplay";
import { useLocalStorage } from "../../util/localstorage/useLocalStorage";
import { CSSProperties, useMemo, useState } from "react";
import { toggleInArray } from "../../util/array";
import IPimg from "../../util/IPimg";
import {
  replaceWebSocketMessage,
  useWebsocket,
} from "../../util/websocket/useWebsocket";
import { POTIONS } from "./potions";
import { useTooltip } from "../../util/tooltip/useTooltip";

interface Props {}

export enum BrewingView {
  DRINK = "DRINK",
  BREW = "BREW",
  FAVORITE = "FAVORITE",
}

const BrewingOverview = ({}: Props) => {
  const dispatch = useIPFDispatch();
  const [view, setView] = useState(BrewingView.DRINK);

  const potions = Object.keys(POTIONS);

  const [favorites, setFavorites] = useLocalStorage(
    "brewing-favorites",
    potions,
    "PotionDisplay"
  );

  const toggle = (potionName: string) => () => {
    setFavorites((favs) => {
      favs = toggleInArray(favs, potionName);
      return potions.filter((potion) => favs.includes(potion));
    });
  };

  const viewSelectorStyle = (selectorView: BrewingView): CSSProperties => ({
    opacity: view === selectorView ? 0.3 : 1,
  });

  const onMessage = useMemo(
    () =>
      replaceWebSocketMessage("OPEN_DIALOGUE", (data) => {
        if (data.split("~")[0] === "INGREDIENTS USED") {
          return "";
        }
        return data;
      }),
    []
  );

  useWebsocket(onMessage, 1, "BrewingOverview");

  const { tooltipProps, Tooltip } = useTooltip(<span>balle</span>, <span>BALLE</span>, <span>ctrl+balle</span>);

  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        width: "300px",
        flexDirection: "row",
        justifyContent: "center",
        border: "1px solid black",
      }}
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
            {...tooltipProps}
          />
          <IPimg
            role="button"
            name={"brewing_kit"}
            onClick={() => setView(BrewingView.BREW)}
            size={30}
            style={viewSelectorStyle(BrewingView.BREW)}
          />
          <IPimg
            role="button"
            name={"view"}
            onClick={() => setView(BrewingView.FAVORITE)}
            size={30}
            style={viewSelectorStyle(BrewingView.FAVORITE)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {(view === BrewingView.FAVORITE ? potions : favorites).map(
            (potion) => (
              <PotionDisplay
                key={potion}
                potionName={potion}
                toggle={toggle(potion)}
                view={view}
                opacity={favorites.includes(potion) ? 1 : 0.5}
              />
            )
          )}
        </div>
      </div>
      <Tooltip />
    </div>
  );
};

export default BrewingOverview;
