import React from "react";

interface Props {
  text: string;
  postText?: string;
}

const Tooltip = ({ text, postText }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {text}
      </div>
      <div>
        {postText}
      </div>
    </div>
  );
};

export default Tooltip;
