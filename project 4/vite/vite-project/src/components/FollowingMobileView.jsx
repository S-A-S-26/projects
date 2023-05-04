import React, { useEffect, useState } from 'react'

export default function Extras({getOtherProfile,profileData,posts}) {

  const [following,setFollowing] = useState(false)

  const fetchFollowing=async()=>{
    try{
      console.log('fetch following from extras')
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
    <div className='mobileViewFollowing'>
        <div className='mobileextraHeading'><b>Following</b></div>
        <hr/>
        {following.length===0?<div className='mobilenoFollowing'>Not following anyone</div>:''}
        {profileData.status==='User unauthenticated' || following.status ==="No user login"?<div className='noFollowing'>login required</div>:<>
              {following.map((user)=>{
                  return <>
                        <button onClick={()=>{getOtherProfile(`profile_id:${user.profileId}`)}}>
                         <div className='containerBeforeFollowing'>
                          <div className='containerFollowing'>
                            <div className='followingImg'><img src={user.profilepic===""?'/media/profilepic/noprofile.png':`/media/${user.profilepic}`} /></div>
                            <div className='followingUsername'>{user.username}</div>
                          </div>
                         </div>
                        </button>
                         <hr/>
                         </>
            })} 
        </>}
    </div>
  )
}
