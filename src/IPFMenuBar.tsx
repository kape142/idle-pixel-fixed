import { useState } from 'react'
import { openActivityLog } from './activitylog/activityLogReducer'
import { useIPFDispatch, useIPFSelector } from './redux/hooks'
import { selectTestFoo, testFoo } from './redux/testReducer'

interface Props {}

const IPFMenuBar = ({}: Props) => {
  const [count, setCount] = useState(0)

  const dispatch = useIPFDispatch()

  return (
    <>
    <hr/>
    <div className="center">
      <span className="color-grey">
      Idle Pixel Fixed  
      </span>
      <div className="App">
      <br />
      <p>
        <button type="button" onClick={()=>dispatch(openActivityLog())}>
          Activity Log
        </button>
      </p>
    </div>
    </div>
    </>
    
  )
}

export default IPFMenuBar
