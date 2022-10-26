import IPimg from "./IPimg";
import React from "react";
import { formatNumber } from "./numberUtils";
import { PropsWithHTMLElementAttributes } from "./domTypes";
import { isNumber } from "./typeGuards";

interface Props {
  name: string;
  label: number | string;
  size?: 10 | 15 | 20 | 25 | 30 | 50 | 100;
}

const LabeledIPimg = ({
  name,
  label,
  size,
  style,
  ...rest
}: PropsWithHTMLElementAttributes<Props>) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        width: `${(size ?? 0) + 20}px`,
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        ...style,
      }}
      {...rest}
    >
      <IPimg name={name} size={size} />
      <span>{isNumber(label) ? formatNumber(label) : label}</span>
    </div>
  );
};

export default LabeledIPimg;
