import {CSSProperties, PropsWithChildren} from "react";

interface Props {
  width: number;
  height: number;
}

const OverviewBox = ({ width, height, children, ...style }: PropsWithChildren<Props> & CSSProperties) => {
  return (
    <div
      style={{
        display: "flex",
        height: `${height}px`,
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
