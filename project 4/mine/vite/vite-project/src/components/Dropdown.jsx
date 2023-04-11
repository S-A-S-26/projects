import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dropdown({post,setEditPost,setEditPost_Post}) {
    const [options,setOptions]=useState('none')
    const navigate=useNavigate()

    const closeDropDown=()=>{
        if (options==='block'){
            setOptions('none')
            window.removeEventListener('click',closeDropDown)
            console.log('drop down closed via event listner window')
        }
    }

    useEffect(()=>{
        if (options==='block'){
            setTimeout(()=>{                
                window.addEventListener('click',closeDropDown)
        
            },100)

        }
    },[options])


    const handleOpt=()=>{
        if (options==='none'){
            setOptions('block')
            
        }
        else{
            closeDropDown()
        }
    }

    const handleEditPost=()=>{
        console.log('edit post working')
        setEditPost(true)
        setEditPost_Post(post)
    }


    
  return (
    <div className='dropDown'>
        <div>
            <button className="optionsbtn" onClick={handleOpt}>...</button>
        </div>
        <div style={{display:options}} className='options'>
            <button className='postEdit' onClick={handleEditPost}>Edit</button>
            <hr/>
            <button className='postRemove'>Remove</button>
        </div>
    </div>
  )
}
