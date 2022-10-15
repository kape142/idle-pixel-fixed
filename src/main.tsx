import IPFMenuBar from "./IPFMenuBar";
import ActivityLog from "./activitylog/ActivityLog";
import { appendReact } from "./util/domOperations";
import { waitFor } from "./util/waitFor";
import OverviewButton from "./overview/OverviewButton";
import OverviewPanel from "./overview/OverviewPanel";
import { store } from "./redux/store";

const init = () => {
  appendReact(<IPFMenuBar />, "menu-bar-buttons");
  appendReact(<ActivityLog />, "content");
  appendReact(<OverviewButton />, "menu-bar-buttons", "menu-bar-keyitems");
  appendReact(<OverviewPanel />, "panels", "panel-keyitems");
  document.body.onkeydown = (ev: any) => {
    if(!ev.repeat){
      console.log(ev, store.getState().keyboard.subscribers)
      store.getState().keyboard.subscribers.forEach((sub) => {
        if (ev.key === sub.key) {
          sub.onKeyDown(ev);
        }
      });
    }
  };
  document.body.onkeyup = (ev: any) => {
    if(!ev.repeat){
      store.getState().keyboard.subscribers.forEach((sub) => {
        if (ev.key === sub.key) {
          sub.onKeyUp(ev);
        }
      });
    }
  };
};

waitFor(() => {
  try {
    var_username?.toLowerCase();
  } catch (e) {
    return false;
  }
  return true;
}, init);
