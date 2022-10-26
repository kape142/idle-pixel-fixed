import { useIPFDispatch, useIPFSelector } from "../redux/hooks";
import ActivityLogEntry from "./ActivityLogEntry";
import {
  closeActivityLog,
  openActivityLog,
  selectActivityLogIsOpen,
} from "./activityLogReducer";
import { useActivityLogWebSocketListener } from "./useActivityLogWebsocketListener";
import {
  subscribeToKeyboardEvent,
  unsubscribeFromKeyboardEvent,
} from "../util/keyboard/keyboardReducer";
import { useEffect, useState } from "react";
import ActivityLogSettingsWindow from "./settings/ActivityLogSettingsWindow";

interface Props {}

const id = "ActivityLog";
const ActivityLog = ({}: Props) => {
  const list = useActivityLogWebSocketListener();

  const open = useIPFSelector(selectActivityLogIsOpen);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const dispatch = useIPFDispatch();

  useEffect(() => {
    dispatch(
      subscribeToKeyboardEvent({
        key: "Tab",
        onKeyDown: (event) => {
          event.preventDefault();
          if (open) {
            setSettingsOpen(false);
            dispatch(closeActivityLog());
          } else {
            dispatch(openActivityLog());
          }
        },
        id,
      })
    );
    return () => {
      dispatch(unsubscribeFromKeyboardEvent({ key: "Tab", id }));
    };
  }, [open, dispatch, setSettingsOpen]);

  return (
    <>
      {open && (
        <div
          onClick={() => dispatch(closeActivityLog())}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            onClick={(event) => {
              setSettingsOpen(false);
              event.stopPropagation();
            }}
            style={{
              position: "absolute",
              top: "10vh",
              left: "25vw",
              width: "50vw",
              height: "85vh",
              textAlign: "center",
              border: "1px solid grey",
              backgroundColor: "#e5fbff",
              borderRadius: "20px",
              padding: "20px",
              zIndex: 10000,
            }}
          >
            <div>
              <h2 className="color-grey">Activity log</h2>
              <button
                title={"Open settings"}
                type="button"
                onClick={(event) => {
                  setSettingsOpen(!settingsOpen);
                  event.stopPropagation();
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "70px",
                  backgroundColor: "grey",
                  borderRadius: "5px",
                  width: "50px",
                }}
              >
                ⚙
              </button>
              <button
                type="button"
                onClick={() => dispatch(closeActivityLog())}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#e01e1e",
                  borderRadius: "5px",
                  width: "50px",
                }}
              >
                X
              </button>
            </div>
            <div
              style={{
                height: "calc(85vh - 120px)",
                overflowY: "auto",
                overflowX: "hidden",
                fontSize: "10px",
              }}
            >
              {list.map((item) => (
                <ActivityLogEntry item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
      <ActivityLogSettingsWindow
        open={settingsOpen}
        setOpen={setSettingsOpen}
      />
    </>
  );
};

export default ActivityLog;
