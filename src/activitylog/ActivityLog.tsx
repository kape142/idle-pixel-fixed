import { useState, useEffect } from 'react'
import {useLocalStorage} from "../util/useLocalStorage";
import ActivityLogEntry from "./ActivityLogEntry";
import {ActivityLogItem} from "./types";

interface Props {
  open: boolean
  closeActivityLog: () => void
}

const ActivityLog = ({open, closeActivityLog}: Props) => {
  //useEffect(()=>{setInterval(()=>setOpen(!open), 5000)}, [])

  //OPEN_LOOT_DIALOGUE=none~images/junk.png~30 Junk~#cce6ff~images/stone.png~3 Stone~#cce6ff

  const [list, setList] = useLocalStorage<ActivityLogItem[]>("activity-log", [])

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
      <button type="button" onClick={closeActivityLog}>
          Close
        </button>
    </div>
    )}</>
  )
}

export default ActivityLog
