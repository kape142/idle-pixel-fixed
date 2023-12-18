import { useIPFDispatch } from "../redux/hooks";
import { openOverview } from "./overviewReducer";
import { hideElementById } from "../util/domOperations";
import IPimg from "../util/IPimg";

interface Props {}

const OverviewButton = ({}: Props) => {
  const dispatch = useIPFDispatch();

  return (
    <div
      className="hover game-menu-bar-left-table-btn"
      role="button"
      onClick={() => {
        hideElementById(Globals.currentPanel);
        Globals.currentPanel = "";
        dispatch(openOverview());
      }}
      style={{padding: "5px 0"}}
    >
      <IPimg
        style={{
          margin: "5px",
        }}
        name={"community_center_1"}
        size={30}
      />
      <span style={{color: "silver"}}>OVERVIEW</span>
    </div>
  );
};

export default OverviewButton;
