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
        border: "1px solid black",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default OverviewBox;
