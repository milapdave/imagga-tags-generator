import React from 'react'

const loader = () => {
  return (
    <>
        <h2>Generating..Please Wait..</h2>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
    </>
  )
}

export default loader
