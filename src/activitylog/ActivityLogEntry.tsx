import { useState, useEffect } from 'react'
import {useLocalStorage} from "../util/useLocalStorage";
import LootEntry from "./entries/LootEntry";
import {ActivityLogItem} from "./types";

interface Props{
    item: ActivityLogItem
}

const ActivityLogEntry = ({item}: Props)  => {

    switch(item.type){
        case "loot": return <LootEntry content={item.content} />
        default: return null
    }
}

export default ActivityLogEntry
