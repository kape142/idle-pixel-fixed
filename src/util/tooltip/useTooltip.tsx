import { type } from "os";
import { MouseEventHandler, ReactElement, useState } from "react";
import { useIPFSelector } from "../../redux/hooks";
import { selectModifierKeys } from "../keyboard/modiferKeyReducer";

type ReturnType = [
  tooltipProps: {
    onMouseOver: MouseEventHandler;
    onMouseOut: MouseEventHandler;
  },
  Tooltip: () => ReactElement,
  hide: () => void
];

type Options = {
  width?: number;
}

type TooltipElements =
  [ReactElement] |
  [ReactElement, ReactElement] |
  [ReactElement, ReactElement, ReactElement];

export const useTooltip = (
  [regular, shift, ctrl]: TooltipElements,
  { width }: Options = {}
): ReturnType => {
  const { ctrlKey, shiftKey } = useIPFSelector(selectModifierKeys);

  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<any>(null);

  const onMouseOver: MouseEventHandler = (event) => {
    setTarget(event.target);
    setVisible(true);
  };

  const onMouseOut: MouseEventHandler = () => {
    setVisible(false);
    setTarget(null);
  };

  return [
    { onMouseOver, onMouseOut },
    () => (
      <>
        {visible && (
          <>
            <div
              style={{
                width: width ? width + "px" : "200px",
                position: "absolute",
                bottom: "112%",
                left: "50%",
                marginLeft: width ? "-" + width / 2 + "px" : "-100px",
                border: "1px solid rgba(0, 0, 0, 0.95)",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                padding: "10px",
                color: "white",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {shiftKey && shift ? shift : ctrlKey && ctrl ? ctrl : regular}
              {ctrl || shift ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "30px",
                  }}
                >
                  <span
                    style={{
                      color: !ctrlKey && !shiftKey ? "#1a9d1a" : "#dddddd",
                    }}
                  >
                    [none]
                  </span>
                  {shift && (
                    <span style={{ color: shiftKey ? "#1a9d1a" : "#dddddd" }}>
                      [shift]
                    </span>
                  )}
                  {ctrl && (
                    <span
                      style={{
                        color: !shiftKey && ctrlKey ? "#1a9d1a" : "#dddddd",
                      }}
                    >
                      [ctrl]
                    </span>
                  )}
                </div>
              ) : null}
              <span
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  marginLeft: "-7px",
                  borderWidth: "7px",
                  borderStyle: "solid",
                  borderColor: "rgba(0, 0, 0, 0.95) transparent transparent transparent",
                  zIndex: 100,
                  pointerEvents: "none",
                }}
              > </span>
            </div>
          </>
        )}
      </>
    ),
    () => {
      setVisible(false);
      setTarget(null);
    },
  ];
};
