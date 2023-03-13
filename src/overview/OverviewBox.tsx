import {CSSProperties, PropsWithChildren} from "react";
import { isNumber } from "../util/typeGuards";

interface Props {
  width: number;
  height: number | string;
}

const OverviewBox = ({ width, height, children, ...style }: PropsWithChildren<Props> & CSSProperties) => {
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
        borderRadius: "30px",
        backgroundColor: "#b1d6dc",
        border: "10px solid #b1d6dc",
        boxSizing: "content-box",
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default OverviewBox;
