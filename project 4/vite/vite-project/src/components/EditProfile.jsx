import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function EditProfile({getCsrf,csrfValue,getProfile,profileData}) {

  let [value,setValue] =useState(profileData.status)
  let [update_status,setup_status]=useState('no')
  const navigate=useNavigate()




  const UpdateProfile=async(e)=>{
    e.preventDefault()
    console.log('updateprofile')
    let form=document.getElementById('editProfileForm')
    let submit=document.getElementById('Update_profile')
    let formData= new FormData(form,submit)
    await getCsrf
    let csrf = csrfValue();
    console.log(formData)

    let opt={
      method:'POST',
      headers:{
        'X-CSRFToken':csrf,
        
        
      },
      body:formData
    }

    let res = await fetch('update_profile',opt)
    console.log(res)
    let value = await res.json()
    console.log(value)
    navigate("/Profile")
    getProfile()
  }

  const handleFile=(event)=>{
    event.preventDefault()
    console.log(event)
    const [files]=event.target.files
    console.log(files)
    const defimage=document.getElementById("defimage")
    const onchange=document.getElementById("onchange")
    setup_status('yes')
    const uploadStatus=document.getElementById("fileUploadStatus")
    onchange.src=URL.createObjectURL(files)
    onchange.style.display='block'
    defimage.style.display='none'
    // uploadStatus.value='yes'
    console.log(uploadStatus.value)
  }

  return (
    <div className='editProfile'>
        <form id='editProfileForm' encType="multipart/form-data" method='post'>
            <div>
                <h1>Edit Profile</h1>
                <hr className='profileHeadinghr'/>
                <div className="profilePicDisp">
                  <img id='defimage' src={profileData.profilepic !== ""?`/media/${profileData.profilepic}`:`/media/profilepic/noprofile.png`}/>
                  <img style={{display:'none',}} src='#' id='onchange'/>
                </div>
                <hr/>
                <div>
                    <label className='fakebutton' htmlFor='Profile_pic'>Change Profilepic</label>
                    <input onChange={handleFile} type='file' id='Profile_pic' name='profile_pic' accept="image/*" hidden/>
                    {/* <input  type='file' id='Profile_pic' name='profile_pic'/> */}
                    {/* <input type='image'/> */}
                </div>
                    <input hidden id='fileUploadStatus' name='fileUploadedStatus' value={update_status}/>
                <div style={{display:'grid',gap:'1.5rem'}}>
                    <label>Status</label><input onChange={(e)=>setValue(e.target.value)} type='text' id='User_status' name='user_status' value={value}/>
                </div>
                <div style={{justifyContent:'center'}}>
                    <button onClick={UpdateProfile} className="primary-btn" type='submit' id='Update_profile' name='update_profile'>Save</button>
                </div>
            </div>
      </form>
    </div>
  )
}
