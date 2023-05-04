import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dropdown({refresh,post,setEditPost,setEditPost_Post,getCsrf,csrfValue,fetchPosts}) {
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

 

    const handleRemove=async()=>{
        await getCsrf;
        let csrf = csrfValue();
    
        let opt = {
          method: "DELETE",
          headers: {
            "X-CSRFToken": csrf,
          },
          body: JSON.stringify({'id':post.id}),
        };
    
        let res = await fetch("/socialapp/updatePost", opt);
        console.log(res);
        let value = await res.json();
        console.log(value);
        // fetchPosts("all")
        refresh()
    }
    
  return (
    <div className='dropDown'>
        <div>
            <button className="optionsbtn" onClick={handleOpt}>...</button>
        </div>
        <div style={{display:options}} className='options'>
            <button id='btn' className='postEdit' onClick={handleEditPost}>Edit</button>
            <hr/>
            <button id='btn' className='postRemove' onClick={handleRemove} >Remove</button>
        </div>
    </div>
  )
}
