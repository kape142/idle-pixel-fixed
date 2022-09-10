import { useIPFDispatch } from "../redux/hooks";
import { openOverview } from "./overviewReducer";
import { hideElementById } from "../util/domOperations";
import IPimg from "../util/IPimg";

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
      <IPimg
        style={{
          marginRight: "10px",
        }}
        name={"community_center_1"}
        className={"w20"}
      />
      <span>OVERVIEW</span>
    </div>
  );
};

export default OverviewButton;
