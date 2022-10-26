import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import {
  addSetItemsObserver,
  removeSetItemsObserver,
  selectSetItemsObservers,
} from "./setItemsReducer";
import {
  observeWebSocketMessage,
  useWebsocket,
} from "../../util/websocket/useWebsocket";
import { reduceToRecord } from "../../util/arrayUtils";

interface Data {
  name: string;
  value: string;
}

export const useNumberItemObserver = (
  item: string,
  id: string,
  specialCase: (value: number) => boolean = (_) => false
): [number, (newValue: number) => void] => {
  const [value, setValue] = useItemObserver(item, id, (value) =>
    specialCase(Number(value))
  );

  return [
    Number(value),
    (newValue: number) => {
      Items.set(item, newValue.toString());
      setValue(newValue.toString());
    },
  ];
};

export const useItemObserver = (
  item: string,
  id: string,
  specialCase: (value: string) => boolean = (_) => false
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(Items.getItem(item).toString());
  const trueValue = useRef(Items.getItem(item).toString());

  const itemId = `${id}-${item}`;

  const [forceTrueValueTimeout, setForceTrueValueTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const setTrueValue = useCallback(
    (newValue: string) => {
      const override = specialCase(newValue);
      if (override) {
        setValue(newValue);
      } else if (value === trueValue.current) {
        setValue(newValue);
      } else {
        if (!forceTrueValueTimeout) {
          setForceTrueValueTimeout(
            setTimeout(() => {
              setValue(trueValue.current);
              setForceTrueValueTimeout(null);
            }, 3000)
          );
        }
      }
      trueValue.current = newValue;
    },
    [
      setValue,
      forceTrueValueTimeout,
      setForceTrueValueTimeout,
      value,
      trueValue,
    ]
  );

  const dispatch = useIPFDispatch();

  useEffect(() => {
    dispatch(
      addSetItemsObserver({
        onChange: setTrueValue,
        item,
        id: itemId,
      })
    );
    return () => {
      dispatch(removeSetItemsObserver(itemId));
    };
  }, [setTrueValue, item, id]);

  return [value, setValue];
};

export const useSetItemsObserver = () => {
  const observers = useIPFSelector(selectSetItemsObservers);

  const onMessage = useMemo(
    () =>
      observeWebSocketMessage("SET_ITEMS", (dataString: string) => {
        const data = reduceToRecord<Data>(dataString.split("~"), [
          (value) => ({ name: value }),
          (value) => ({ value: value }),
        ]);
        observers.forEach((observer) => {
          data.forEach((d) => {
            if (d.name === observer.item) {
              observer.onChange(d.value);
            }
          });
        });
      }),
    [observers]
  );
  useWebsocket(onMessage, 10, "setItems");
};
