import { useItemObserver, useNumberItemObserver } from "./setItems/useSetItemsObserver";
import { CSSProperties, PropsWithChildren } from "react";
import { isNumber } from "../util/typeGuards";

interface Props {
  width: number;
  height: number | string;
}

const id = "OverviewBox";
const OverviewBox = ({ width, height, children, ...style }: PropsWithChildren<Props> & CSSProperties) => {

  const [uiMenuBackgroundColor] = useItemObserver("ui_menu_background_color", id);

  return (
    <div
      style={{
        display: "flex",
        height: isNumber(height) ? `${height}px` : height,
        minHeight: `250px`,
        width: `${width}px`,
        gap: "5px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        color: "#fff",
        textShadow: "1px 1px #000, 0px 0px 3px #000",
        backgroundColor: uiMenuBackgroundColor !== "none" ? uiMenuBackgroundColor + "aa" : "#004c4eaa",
        padding: "10px",
        boxSizing: "content-box",
        ...style
      }}
    >
      {children}
    </div >
  );
};

export default OverviewBox;
