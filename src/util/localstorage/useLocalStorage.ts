import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIPFDispatch, useIPFSelector } from "../../redux/hooks";
import {
  selectLocalStorageSubscribers,
  subscribeToLocalStorage,
  unsubscribeFromLocalStorage,
} from "./localStorageReducer";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  id: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const prevSaved = window.localStorage.getItem(`${var_username}.${key}`);
    return prevSaved ? JSON.parse(prevSaved) : initialValue;
  });

  const dispatch = useIPFDispatch();
  const subscribers = useIPFSelector(selectLocalStorageSubscribers);

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
    window.localStorage.setItem(
      `${var_username}.${key}`,
      JSON.stringify(value)
    );
    subscribers
      .filter((sub) => sub.key === key)
      .forEach((sub) => {
        sub.setValue(value);
      });
  }, [key, value]);

  return [value, setValue];
};
