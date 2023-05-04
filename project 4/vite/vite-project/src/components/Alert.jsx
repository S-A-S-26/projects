import React from 'react'

export default function Alert({alertMessage}) {
  return (alertMessage&&
    <>
    <div className='alertbox'>
    <b>Please try again</b>
    <br/>
    <br/>
    <span>{alertMessage}</span>
    </div>
    </>
  )
}
