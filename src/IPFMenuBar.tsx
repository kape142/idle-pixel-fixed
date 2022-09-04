import { openActivityLog } from "./activitylog/activityLogReducer";
import { useIPFDispatch } from "./redux/hooks";

interface Props {}

const IPFMenuBar = ({}: Props) => {
  const dispatch = useIPFDispatch();

  return (
    <>
      <hr />
      <div className="center">
        <span className="color-grey">Idle Pixel Fixed</span>
        <div className="App">
          <br />
          <p>
            <button type="button" onClick={() => dispatch(openActivityLog())}>
              Activity Log
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default IPFMenuBar;
