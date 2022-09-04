import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import {
  selectSubscribers,
  subscribeToLocalStorage,
  unsubscribeFromLocalStorage,
} from "./localStorageReducer";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  id: string
): [T, Dispatch<T>] => {
  const [value, setValue] = useState<T>(() => {
    const prevSaved = window.localStorage.getItem(key);
    return prevSaved ? JSON.parse(prevSaved) : initialValue;
  });

  const dispatch = useIPFDispatch();
  const subscribers = useIPFSelector(selectSubscribers);

  useEffect(() => {
    dispatch(
      subscribeToLocalStorage({
        setValue,
        key,
        id,
      })
    );
    return () => {
      dispatch(unsubscribeFromLocalStorage({ key, id }));
    };
  }, [key, setValue, id]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
    subscribers
      .filter((sub) => sub.key === key)
      .forEach((sub) => {
        sub.setValue(value);
      });
  }, [key, value]);

  return [value, setValue];
};
