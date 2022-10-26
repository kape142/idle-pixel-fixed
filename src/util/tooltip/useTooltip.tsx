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

export const useTooltip = (
  regular: ReactElement,
  shift?: ReactElement,
  ctrl?: ReactElement
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
          <div
            style={{
              position: "absolute",
              top: target && `${target.offsetTop}px`,
              left: target && `${target.offsetLeft + target.offsetWidth}px`,
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
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
          </div>
        )}
      </>
    ),
    () => {
      setVisible(false);
      setTarget(null);
    },
  ];
};
