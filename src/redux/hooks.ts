import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"


export const useIPFDispatch: () => AppDispatch = useDispatch
export const useIPFSelector: TypedUseSelectorHook<RootState> = useSelector