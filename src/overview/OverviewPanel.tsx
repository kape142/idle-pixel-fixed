import { closeOverview, selectOverviewIsOpen } from "./overviewReducer";
import { useIPFDispatch, useIPFSelector } from "../redux/hooks";
import { openOverview } from "./overviewReducer";
import { hideElementById } from "../util/domOperations";
import BrewingOverview from "./brewing/BrewingOverview";
import { useEffect, useRef } from "react";

interface Props {}

const OverviewPanel = ({}: Props) => {
  const dispatch = useIPFDispatch();
  const overviewIsOpen = useIPFSelector(selectOverviewIsOpen);

  const oldSwitchPanels = useRef(switch_panels);
  useEffect(() => {
    switch_panels = (id: string) => {
      dispatch(closeOverview());
      oldSwitchPanels.current(id);
    };
  }, []);

  return overviewIsOpen ? <BrewingOverview /> : null;
};

export default OverviewPanel;
