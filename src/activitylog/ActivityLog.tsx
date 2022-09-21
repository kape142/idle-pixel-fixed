import { useIPFDispatch, useIPFSelector } from "../redux/hooks";
import { useLocalStorage } from "../util/localstorage/useLocalStorage";
import ActivityLogEntry from "./ActivityLogEntry";
import {
  closeActivityLog,
  selectActivityLogIsOpen,
} from "./activityLogReducer";
import { ActivityLogSettings } from "./types";
import { useActivityLogWebSocketListener } from "./useActivityLogWebsocketListener";

interface Props {}

const ActivityLog = ({}: Props) => {
  const [settings, setSettings] = useLocalStorage<ActivityLogSettings>(
    "activity-log-settings",
    { blockDialogues: true },
    "ActivityLog"
  );

  const list = useActivityLogWebSocketListener(settings);

  const open = useIPFSelector(selectActivityLogIsOpen);
  const dispatch = useIPFDispatch();

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
            onClick={(event) => event.stopPropagation()}
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
                title={
                  "Toggle showing loot pop-ups. O means they will appear, Ø means they are blocked."
                }
                type="button"
                onClick={() =>
                  setSettings((set) => ({
                    ...set,
                    blockDialogues: !set.blockDialogues,
                  }))
                }
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "70px",
                  backgroundColor: "grey",
                  borderRadius: "5px",
                  width: "50px",
                }}
              >
                {settings.blockDialogues ? "Ø" : "O"}
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
              }}
            >
              {list.map((item) => (
                <ActivityLogEntry item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityLog;
