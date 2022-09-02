import {Dispatch, useEffect, useState} from "react"

export const useLocalStorage = <T>(key: string, initialValue:T): [T, Dispatch<T>] => {
    const [value, setValue] = useState<T>(()=>{
        const prevSaved = window.localStorage.getItem(key)
        return prevSaved ? JSON.parse(prevSaved) : initialValue
    })

    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}