import { useState, useEffect } from 'react'
import { useIPFDispatch, useIPFSelector } from '../redux/hooks';
import { selectTestFoo, testFoo } from '../redux/testReducer';
import {useLocalStorage} from "../util/localstorage/useLocalStorage";
import ActivityLogEntry from "./ActivityLogEntry";
import { closeActivityLog, selectActivityLogIsOpen } from './activityLogReducer';
import {ActivityLogItem} from "./types";

interface Props {}

const ActivityLog = ({}: Props) => {

  //OPEN_LOOT_DIALOGUE=none~images/junk.png~30 Junk~#cce6ff~images/stone.png~3 Stone~#cce6ff

  const [list, setList] = useLocalStorage<ActivityLogItem[]>("activity-log", [], "ActivityLog")

  
  const open = useIPFSelector(selectActivityLogIsOpen)
  const dispatch = useIPFDispatch()

  return (<>
    {open && (
    <div style={{
      position: 'absolute',
      top: '10vh',
      left: '25vw',
      width: '50vw',
      height: '85vh',
      textAlign: 'center',
      border: '1px solid grey',
      backgroundColor: "#e5fbff",
      borderRadius: "20px",
      padding: "20px"
    }}>
      <h2 className="color-grey">
      Activity log
      </h2>
      {list.map(item => (
          <ActivityLogEntry item={item} />
      ))}
      <button type="button" onClick={()=> dispatch(closeActivityLog())}>
          Close
        </button>
    </div>
    )}</>
  )
}

export default ActivityLog
