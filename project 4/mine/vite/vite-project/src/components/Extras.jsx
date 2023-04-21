import React, { useEffect, useState } from 'react'

export default function Extras({profileData,posts}) {

  const [following,setFollowing] = useState(false)

  const fetchFollowing=async()=>{
    try{
      console.log('following')
      const response= await fetch('/socialapp/getfollowing',{method:'GET'})
      const data= await response.json()
      console.log(data)
      setFollowing(data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchFollowing()
  },[])

  useEffect(()=>{
    fetchFollowing()
  },[posts])

  return (following && 
    <div className='adds'>
        <div className='extraHeading'><b>Following</b></div>
        <hr/>
        {following.length===0?<div className='noFollowing'>Not following anyone</div>:''}
        {profileData.status==='User unauthenticated' || following.status ==="No user login"?<div className='noFollowing'>login required</div>:<>
              {following.map((user)=>{
                  return <>
                         <div className='containerFollowing'>
                           <div className='followingImg'><img src={user.profilepic===""?'/media/profilepic/noprofile.png':`/media/${user.profilepic}`} /></div>
                           <div className='followingUsername'>{user.username}</div>
                         </div>
                         <hr/>
                         </>
            })} 
        </>}
    </div>
  )
}
