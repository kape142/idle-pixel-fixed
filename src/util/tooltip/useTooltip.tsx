import { MouseEventHandler, ReactElement, useState } from "react";
import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import { selectOverviewIsOpen } from "../../overview/overviewReducer";
import { selectModifierKeys } from "../keyboard/modiferKeyReducer";

type ReturnType = [
  {
    onMouseOver: MouseEventHandler;
    onMouseOut: MouseEventHandler;
  },
  () => ReactElement
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
    console.log(event);
    setTarget(event.target);
    setVisible(true);
  };

  const onMouseOut: MouseEventHandler = (event) => {
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
              zIndex: 100
            }}
          >
            {ctrlKey && ctrl ? ctrl : shiftKey && shift ? shift : regular}
          </div>
        )}
      </>
    ),
  ];
};
