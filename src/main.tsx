import IPFMenuBar from "./IPFMenuBar";
import ActivityLog from "./activitylog/ActivityLog";
import { appendReact } from "./util/domOperations";
import { waitFor } from "./util/waitFor";
import OverviewButton from "./overview/OverviewButton";
import OverviewPanel from "./overview/OverviewPanel";

const init = () => {
  appendReact(<IPFMenuBar />, "menu-bar-buttons");
  appendReact(<ActivityLog />, "content");
  appendReact(<OverviewButton />, "menu-bar-buttons", "menu-bar-keyitems")
  appendReact(<OverviewPanel />, "panels", "panel-keyitems")
};

waitFor(() => {
  try {
    var_username?.toLowerCase();
  } catch (e) {
    return false;
  }
  return true;
}, init);
