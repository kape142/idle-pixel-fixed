import IPFMenuBar from "./IPFMenuBar";
import ActivityLog from "./activitylog/ActivityLog";
import { appendReact } from "./util/domOperations";
import { waitFor } from "./util/waitFor";

const init = () => {
  appendReact(<IPFMenuBar />, "menu-bar-buttons");
  appendReact(<ActivityLog />, "content");
};

waitFor(() => {
  try {
    var_username?.toLowerCase();
  } catch (e) {
    return false;
  }
  return true;
}, init);
