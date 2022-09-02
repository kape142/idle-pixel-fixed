import { useState } from 'react'

interface Props {
  openActivityLog: () => void
}

const IPFMenuBar = ({openActivityLog}: Props) => {
  const [count, setCount] = useState(0)

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
        <button type="button" onClick={openActivityLog}>
          Activity Log
        </button>
      </p>
    </div>
    </div>
    </>
    
  )
}

export default IPFMenuBar
