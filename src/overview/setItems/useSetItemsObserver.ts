import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { isNumber, isString } from "../../util/typeGuards";

interface Data {
  name: string;
  value: string;
}

export const useNumberItemObserver = (
  item: string,
  id: string
): [number, (newValue: number) => void] => {
  const [value, setValue] = useItemObserver(item, id);

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
  id: string
): [string, (newValue: string) => void] => {
  const [value, _setValue] = useState(Items.getItem(item));
  const [trueValue, _setTrueValue] = useState(Items.getItem(item));

  const itemId = `${id}-${item}`;

  const observers = useIPFSelector(selectSetItemsObservers);

  const [forceTrueValueTimeout, setForceTrueValueTimeout] = useState(
    setTimeout(() => {})
  );

  const setValue = useCallback(
    (newValue: string) => {
      _setValue(newValue);
      Items.set(item, newValue);
      observers.forEach((observer) => observer.item === item && observer.onChange(newValue));
    },
    [observers, item, _setValue]
  );

  const setTrueValue = useCallback(
    (newValue: string) => {
      if (value === trueValue) {
        _setValue(newValue);
      } else {
        clearTimeout(forceTrueValueTimeout);
        setForceTrueValueTimeout(
          setTimeout(() => {
            _setValue(newValue);
          }, 3000)
        );
      }
      _setTrueValue(newValue);
    },
    [_setValue, _setTrueValue, forceTrueValueTimeout, setForceTrueValueTimeout]
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
