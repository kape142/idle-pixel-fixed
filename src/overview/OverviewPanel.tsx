import { closeOverview, selectOverviewIsOpen } from "./overviewReducer";
import { useIPFDispatch, useIPFSelector } from "../redux/hooks";
import BrewingOverview from "./brewing/BrewingOverview";
import { useEffect, useRef } from "react";
import { useSetItemsObserver } from "./setItems/useSetItemsObserver";
import WoodcuttingOverview from "./woodcutting/WoodcuttingOverview";
import CraftingOverview from "./crafting/CraftingOverview";
import MiningOverview from "./mining/MiningOverview";
import { useLocalStorage } from "../util/localstorage/useLocalStorage";
import { ActivityLogItem } from "../activitylog/types";
import ActivityLogEntry from "../activitylog/ActivityLogEntry";
import FarmingOverview from "./farming/FarmingOverview";
import GatheringOverview from "./gathering/GatheringOverview";
import { subscribeToKeyboardEvent } from "../util/keyboard/keyboardReducer";
import {
  ctrlKeyDown,
  ctrlKeyUp,
  shiftKeyDown,
  shiftKeyUp,
} from "../util/keyboard/modiferKeyReducer";

interface Props {}

const id = "OverviewPanel";
const OverviewPanel = ({}: Props) => {
  const dispatch = useIPFDispatch();
  const overviewIsOpen = useIPFSelector(selectOverviewIsOpen);
  useSetItemsObserver();

  const oldSwitchPanels = useRef(switch_panels);
  useEffect(() => {
    switch_panels = (id: string) => {
      dispatch(closeOverview());
      oldSwitchPanels.current(id);
    };
  }, []);

  const [list] = useLocalStorage<ActivityLogItem[]>("activity-log", [], id);

  useEffect(() => {
    dispatch(
      subscribeToKeyboardEvent({
        key: "Control",
        onKeyDown: () => {
          console.log("ctrlkeydown")
          dispatch(ctrlKeyDown);
        },
        onKeyUp: () => dispatch(ctrlKeyUp),
        id: `${id}-ctrl`,
      })
    );
    dispatch(
      subscribeToKeyboardEvent({
        key: "Shift",
        onKeyDown: () => dispatch(shiftKeyDown),
        onKeyUp: () => dispatch(shiftKeyUp),
        id: `${id}-shift`,
      })
    );
  }, []);

  return overviewIsOpen ? (
    <div
      style={{
        display: "flex",
        gap: "15px",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "75%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              width: "50%",
            }}
          >
            <WoodcuttingOverview />
            <FarmingOverview />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              width: "50%%",
            }}
          >
            <BrewingOverview />
            <GatheringOverview />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              width: "50%%",
            }}
          >
            <CraftingOverview />
            <MiningOverview />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center",
          width: "25%",
          fontSize: "8px",
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100vh - 200px)",
          border: "1px solid grey",
          borderRadius: "10px",
        }}
      >
        {list.slice(0, 25).map((item) => (
          <ActivityLogEntry item={item} />
        ))}
      </div>
    </div>
  ) : null;
};

export default OverviewPanel;
