import  { useEffect, useRef, useState } from 'react'
import frontarrow from '../assets/frontarrow.png'
import backarrow from '../assets/backarrow.png'
import { useNavigate } from 'react-router-dom'

export default function AddPost({getCsrf,csrfValue,fetchPosts}) {
    
    const[files,setfiles]=useState([])
    const[count,setcount]=useState(0)
    const navigate=useNavigate()

    useEffect(()=>{
        console.log('files state')
        console.log(files)
        if (files.length != 0){

            const preview_addpost_img=document.getElementById("preview_addpost_img")
            preview_addpost_img.src=URL.createObjectURL(files[count])
        }
    },[files])

    useEffect(()=>{
        console.log('count state')
        console.log(count)
        if (files.length != 0){
            console.log('inside count effect')
            console.log(files[count])
            const preview_addpost_img=document.getElementById("preview_addpost_img")
            preview_addpost_img.src=URL.createObjectURL(files[count])
        }
    },[count])



    const handleFile=(event)=>{
        event.preventDefault()
        console.log(event)
        if (event.target.files.length>4){
            alert('Please select upto 4 images or less')
            return null
        }
        const filesz=event.target.files
        setcount(0)
        console.log(filesz)
        setfiles(filesz)
        preview_addpost_img.style.display='block'

      }
    
    const addPostTextarea=useRef()
    const handleSubmit=async(e)=>{
        if(addPostTextarea.current.value===''){
            console.log('return')
            return
        }
        e.preventDefault()
        const form=document.getElementById("newPostForm")
        const submit=document.getElementById("newPostsubmit")
        const formData=new FormData(form,submit)
        await getCsrf
        let csrf = csrfValue();
        console.log(formData)

        let filenames=[]
        for(let i of files){
            console.log('i')
            console.log(i.name)
            formData.append(i.name,i)
            filenames.push(`posts/${i.name}`)
        }
        console.log(formData)
        
        let opt={
          method:'POST',
          headers:{
            'X-CSRFToken':csrf,
            
            
          },
          body:formData
        }
    
        let res = await fetch('newpost',opt)
        console.log(res)
        let value = await res.json()
        console.log(value)
        fetchPosts("all")
        navigate("/")


    }

  return (
    <div className='addpost'>
      <h1>New Post</h1>
      <hr className='profileHeadinghr'/>
        <form id='newPostForm' encType="multipart/form-data" method='post' name='addpostform'>

            <div>
                <div>
                    <textarea ref={addPostTextarea} id='addPostTextarea' maxLength='255' name='description' required='true' placeholder='Type your Post here'></textarea>
                </div>
                <div>
                    <label className='fakebutton' htmlFor='add_postimages'>Add Image</label>
                    <input  onChange={handleFile} id='add_postimages' type='file' accept='image/*' multiple hidden/>
                </div>

                <div>
                    <button id='newPostsubmit' onClick={handleSubmit} className='primary-btn' name='submitbutton' type='submit'>Post</button>
                    {/* <button className='primary-btn' onClick={()=>{test('helllo')}}>Post</button> */}
                </div>
                <div className='imgpreviewwin'>
                    {/* <div>{count}{files.length}</div> */}
                    <button className='leftb' type='button' disabled={count==0?true:false} onClick={()=>{setcount(count - 1)}}><img src={backarrow} alt='<'/></button>
                    <button className='rightb' type='button' disabled={count==files.length-1 || files.length == 0?true:false} onClick={()=>{setcount(count + 1)}}><img src={frontarrow} alt='>'/></button>
                    <img id='preview_addpost_img' src='#' alt='post img preivew' style={{display:'none'}}/>
                    {/* {files==[]?'#':URL.createObjectURL(files[count])} */}
                </div>

            </div>

        </form>
    </div>
  )
}
