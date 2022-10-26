import { ActivityLogSettings, initialActivitLogSettings } from "../types";
import { useLocalStorage } from "../../util/localstorage/useLocalStorage";
import ActivityLogSetting from "./ActivityLogSetting";
import { keysOf } from "../../util/typeUtils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const settingTexts: Record<keyof ActivityLogSettings, string> = {
  blockDialogues: "Block loot pop-ups",
  showInOverview: "Show activity log in Overview",
};

const id = "ActivityLogSettingsWindow";
const ActivityLogSettingsWindow = ({ open, setOpen }: Props) => {
  const [settings, setSettings] = useLocalStorage<ActivityLogSettings>(
    "activity-log-settings",
    initialActivitLogSettings,
    id
  );

  const toggleSetting = (name: keyof ActivityLogSettings) => {
    setSettings((oldValue) => ({ ...oldValue, [name]: !oldValue[name] }));
  };

  return (
    <>
      {open && (
        <div
          onClick={(event) => {
            event.stopPropagation();
            setOpen(false);
          }}
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
              top: "15vh",
              left: "30vw",
              width: "40vw",
              height: "30vh",
              textAlign: "center",
              border: "1px solid grey",
              backgroundColor: "#e5fbff",
              borderRadius: "20px",
              padding: "20px",
              zIndex: 10000,
            }}
          >
            <div>
              <h2 className="color-grey">Settings</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {keysOf(initialActivitLogSettings).map((key) => (
                  <ActivityLogSetting
                    text={settingTexts[key]}
                    value={settings[key]}
                    onClick={() => toggleSetting(key)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
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
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityLogSettingsWindow;
