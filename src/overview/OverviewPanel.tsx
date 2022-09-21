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

interface Props {}

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

  const [list, _] = useLocalStorage<ActivityLogItem[]>(
    "activity-log",
    [],
    "OverviewPanel"
  );

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
          width: "75%"
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
        {list.slice(0, 10).map((item) => (
          <ActivityLogEntry item={item} />
        ))}
      </div>
    </div>
  ) : null;
};

export default OverviewPanel;
