import React, { useEffect, useState } from 'react'
import frontarrow from '../assets/frontarrow.png'
import backarrow from '../assets/backarrow.png'

export default function ImagePreview({imgWin,setimgWin,previewImg}) {
    const [counter,setCounter]=useState(0)
    useEffect(()=>{
      console.log(counter)
    },[counter])

  return (imgWin &&
    <div>
        <div className="mask" onClick={()=>{setimgWin(false);setCounter(0)}}></div>
        <div className='imgPreview'>
            <div>
              <img src={`media/${previewImg[counter]}`} />
            </div>
            <button disabled={counter<=0} onClick={()=>{setCounter(counter-1)}}><img src={backarrow}  alt='previous'/></button>
            <button style={{left: '95%',}} disabled={counter>=previewImg.length-1} onClick={()=>{setCounter(counter+1)}}><img src={frontarrow} alt='next' /></button>
        </div>
    </div>
  )
}
