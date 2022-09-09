import { openActivityLog } from "../activitylog/activityLogReducer";
import { useIPFDispatch } from "../redux/hooks";
import { openOverview } from "./overviewReducer";
import { hideElementById } from "../util/domOperations";

interface Props {}

const OverviewButton = ({}: Props) => {
  const dispatch = useIPFDispatch();

  return (
    <div
      className="hover hover-menu-bar-item"
      role="button"
      onClick={() => {
        hideElementById(Globals.currentPanel);
        Globals.currentPanel = "";
        dispatch(openOverview());
      }}
    >
      <img
        style={{
          marginRight: "10px"
        }}
        src={get_image("images/community_center_1.png")}
        className={"w20"}
        alt={"community_center_1"}
      />
      <span>OVERVIEW</span>
    </div>
  );
};

export default OverviewButton;
